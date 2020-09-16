import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
    return (
        // map the todo values to the Todo.js using the prop
        // this is nothing but a simple foreach to print each todo
        todos.map(todo => {
            // the key attrbute is to make sure that react doesn't load all the elemnts of map
            // thereby it is a good practice to specify the unique identifier, and to even avoid the error in console
            return <Todo key = {todo.id} toggleTodo = {toggleTodo} todo = {todo} />
        })
    )
}
