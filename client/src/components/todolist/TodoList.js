import {useState,useEffect} from 'react'
import './todolist.css'
import axios from 'axios';  
import {Modal,Table,Input} from "antd";
import {EditOutlined, DeleteOutlined, SearchOutlined  } from "@ant-design/icons";
import EditModal from '../editmodal/EditModal';
import InputsField from '../inputsfield/InputsField';


const TodoList = () => {
  const [dataSource, setDataSource] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState({
    Task:"",
    Date:"",
    Status:"",
  });
  const [dataTosend,setDataTosend] = useState({
    Task:'',
    Date:'',
    Status:'uncompleted'
  })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const localHost = "http://localhost:3001"
 
  // columns data that goes inside the table as props 
  const COLUMNS = [
    {
      key:"1",
      title: "Task",
      dataIndex: "Task",
      filterDropdown:({selectedKeys, setSelectedKeys, confirm, })=>{
        return (
          <Input
            autoFocus
            placeholder='Search task'
            value={selectedKeys[0]}
            onPressEnter={()=>{
              confirm()
            }}
            onBlur={()=>{
              confirm()
            }}
            onChange={(e)=>{
              setSelectedKeys(e.target.value?[e.target.value]:[])
            }}
          >
          </Input>         
        );
      },
      filterIcon:()=>{
        return <SearchOutlined/>
      },
      onFilter:(value,record)=>{
        return record.Task.toLowerCase().includes(value.toLowerCase())
      }
    },
    {
      key:"2",
      title: "Date",
      dataIndex: "Date",
      sorter:(record1,record2)=>{
        return record1.Date > record2.Date
      }
    },
    {
      key:"3",
      title: "Status",
      dataIndex: "Status",
      filters:[
        {text:"done",value: true,},
        {text:"uncompleted",value: false}
      ],
      onFilter:(value,record)=>{
        if(record.Status === "done" && value === true){
          return record
        } else if (record.Status === "uncompleted" && value === false ){
          return record
        }
      }
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
              editTask(record);
              }}
            />
            <DeleteOutlined
              onClick={() =>{removeTaskFromTable(record)}}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  //delete request to sever  
  const deleteTask = async (id)=>{
    try {
      await axios.delete(`${localHost}/delete/${id}`)
    } catch (err) {
      console.error(err)
    }   
  }

  // fetching all tasks from server 
  const fetchData = async()=>{
    try {
      const data = await axios.get(`${localHost}/getall`)
      if (data){
        setDataSource(data.data)  // setting the data from server to state
      }
    } catch (err) {
      console.error(err)
    }
  }

  //data from server when component mount
  useEffect(()=>{
    fetchData()
  },[])

  //preparing the input's data for sending to server - post request  
  const  handleinputs = (e) => {
    const {name, value} = e.target
    setDataTosend(prev => ({
        ...prev,
        [name]: value,
    }))
  }

  // post rquest and rendering the data to the table 
  const postTask = async () =>{
    try {
      await axios.post(`${localHost}/create`,{Task: dataTosend.Task, Date:dataTosend.Date, Status:dataTosend.Status})
    } catch (err) {
      console.error(err)
    }
    renderTask()
  }

  // render the task information to the table 
  const renderTask = () =>{
    setDataSource(prev=> [...prev,dataTosend])
  }

  //// open a modal, remove task from table and delete task from db - deleteTask
  const removeTaskFromTable = (record) => {
    const taskDay = new Date(record.Date).getUTCDate();
    const taskYear = new Date(record.Date).getFullYear();  
    const currentday = new Date().getUTCDate();
    const currenYear = new Date().getFullYear();
    const difference = taskDay - currentday
    if(taskYear === currenYear && difference >= 6){
      Modal.confirm({
        title: "can't delete task that it's deadline is more than 6 days",
      })
    }else{
      Modal.confirm({
        title: "Are you sure, you want to delete this student record?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          deleteTask(record.id) // delete task from db
          setDataSource((pre) => { // remove task from table 
            return pre.filter((task) => task.id !== record.id);
          });
        },
      });
    };
  }
  
  // opens the edit modal to edit the task - all the data comes from the table
  const editTask = (record) => {
    setIsEditing(true);
    setEditingTask(record);
  };

  // update request to the server
  const UpdateTask = async (taskObj)=>{
    try {
      await axios({ 
        method: 'put',
        url:`http://localhost:3001/update/${taskObj.id}`,
        data: {
          Task: taskObj.Task,
          Date: taskObj.Date,
          Status:taskObj.Status
        }})
    } catch (err) {
      console.error(err)
    }   
  }

  // resetting the data after edit and close the modal  
  const resetEditing = () => {
    setIsEditing(false);
    setEditingTask(null);
  }

  // update the modal inputs from the imputField component 
  const handleModalEdit = (e) =>{
    const {name,value} = e.target;
    setEditingTask(prev => ({
        ...prev,
        [name]: value
    }))
  }

  return (
    <div className="conatiner">
      <InputsField
        handleinputs={handleinputs}
        dataSource={dataSource}
        postTask={postTask}
      />
      <Table
        className='table'
        columns={COLUMNS}
        dataSource={dataSource}
        pagination={{
          current:page,
          pageSize:pageSize,
          onChange:(page, pageSize)=>{
            setPage(page)
            setPageSize(pageSize)  
          }
        }}
      >
      </Table> 
      <EditModal
        isEditing={isEditing}
        resetEditing={resetEditing}
        setDataSource={setDataSource}
        editTask={editTask}
        editingTask={editingTask}
        handleModalEdit={handleModalEdit}
        UpdateTask={UpdateTask}
      />
    </div>
  );
}

export default TodoList