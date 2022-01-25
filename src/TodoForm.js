import React from "react";

export default function TodoForm(props){
   

   const [input,setInput] = React.useState("")
    
    function handleSubmit(e){
        e.preventDefault()
        props.addTodo(input)
        setInput("")
    }

    return(
        <form className="todo-form" onSubmit={handleSubmit} >
            <input 
            type="text"
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            className="todo-input"
            placeholder="Add Todo"
            />
            <button type="submit" className="todo-button">
                Add task
            </button>
        </form>
    )
}
