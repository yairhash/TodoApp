import React from 'react'
import { Modal,Input } from "antd";


const EditModal = ({UpdateTask,isEditing,resetEditing,setDataSource,editTask,editingTask,handleModalEdit}) => {
  return (
    <Modal
        title="Edit task"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
        resetEditing();
        }}
        onOk={() => {
        setDataSource((pre) => {
            return pre.map((task) => {
            if(task.id === editingTask.id) {
                return editingTask;
            } else {
                return task;
            }
            });
        });
        UpdateTask(editingTask)
        resetEditing();
        }}
    >
        <Input
            name="Task"
            type="text"
            value={editingTask?.Task}
            onChange={(e) => handleModalEdit(e)}
            placeholder="Task name"
        />
        <Input
            name="Date"
            type="date"
            value={editingTask?.Date}
            onChange={(e) => handleModalEdit(e)}
            placeholder="Date"
        />
        <Input
            name='Status'
            type="text"
            value={editingTask?.Status}
            onChange={(e) => handleModalEdit(e)}
            placeholder="Status"
        />
  </Modal>
  )
}

export default EditModal
