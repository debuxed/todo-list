import React from 'react'

export default function Todo({todo, toggleTodo}) {

    function handleTodoChange() {
        toggleTodo(todo.id)
    }
    
    return (
        <div className="form-check">
            <label className="form-check-label">
                <input type="checkbox" className="form-check-input" checked={todo.complete} onChange={handleTodoChange}/>
                {todo.name}
            </label>
        </div>
    )
}
