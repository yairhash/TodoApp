import React from "react";
import './index.css';
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";






function App() { 

  const[todos,setTodos] = React.useState([])

  function addTodo(text){
    let id = 1
    if(todos.length > 0){
      id = todos[0].id +1
    }
    let newTodo = {
      id:id,
      text:text,
      completed:false
    }
    setTodos([newTodo,...todos])
  }


  function removeTodo(id){
    let updatedTodos = [...todos].filter((todo)=>todo.id !== id)
    setTodos(updatedTodos)
  }

  function completeTodo(id){
    let updatedTodos = [...todos].map((todo)=>{
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }


  React.useEffect(()=>{
    const getJson = localStorage.getItem("todos")
    const loadTodos = JSON.parse(getJson)
    if(loadTodos){
      setTodos(loadTodos)
    }
  },[])

  React.useEffect(() => {
    const createJson = JSON.stringify(todos)
    localStorage.setItem("todos",createJson)
  }, [todos])


  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <TodoForm addTodo={addTodo} />
      <hr className="seperator"/>
      {todos.map((todo)=>{
        return(
          <TodoItem completeTodo={completeTodo} removeTodo={removeTodo} key={todo.id} todo={todo}/>
        )
      })}
    </div>
  );
}

export default App;







 

  // function deleteTask(id){
  //    const updatedList = [...todoList].filter((todo)=> id !== todo.id)
  //    setTodoList(updatedList)

  // }

  // function toggleComplete(id){
  //   const updatedCheck = [...todoList].map((todo)=>{
  //     if(id === todo.id){
  //       todo.completed = !todo.completed
  //     }
  //     return todo 
  //   })
  //   setTodoList(updatedCheck)
  // }

