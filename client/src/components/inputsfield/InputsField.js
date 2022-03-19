import React from 'react'
import './inputsfield.css'


const InputsField = ({handleinputs,dataSource,postTask}) => {
  return (
    <div className='inputs-container'>
      <input 
            name='Task'
            type="text"
            onChange={(e)=>handleinputs(e)}
            value={dataSource.Task}
            className="todo-input"
            placeholder="Task name..."
              />
        <input 
            name="Date"
            type="date"
            onChange={(e)=>handleinputs(e)}
            value={dataSource.Date}
            className="todo-input"
            placeholder="Task date..."
        />
        <button className='btn' onClick={postTask}>Add</button>
    </div>
  )
}

export default InputsField
