import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todo'

function App() {
  // Object destructuring
  // The first param `todo` holds the value of the array
  // the second param is used to set the toDo value
  const [todos, setTodos] = useState([])
  
  // this useEffect() hook is used to return the persistent array data on refesh
  // we are passing an empty array of dependencies as it will just call this once and the 
  // empty array would never be changed
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  // this useEffect() hook is use to maintain the persistent array on refresh
  // the array is passed as the param and stoed locally using a key
  // the [todos] is passed to check if there are any changes made using that array
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // the function is responsible to toggle the todo values
  function toggleTodo(id) {
    // in react we copy the values in a newer array before making the change and then 
    // set the value to the original array
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }

  // useRef() is use to track the values from html textboxes

  const todoNameRef = useRef()
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return
    setTodos(oldTodos => {
      return [...oldTodos, {id: uuidv4(), name: name, complete: false}] // using the uuid() for creating the unique keys everytime
    })
    todoNameRef.current.value = null;
  }

  // Clear the completed todos from the todo array
  function handleClearTodos(e) {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <h1> ToDo List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/> <br></br><br></br>
    <button onClick={handleAddTodo} className="btn btn-outline-primary mr-1">Add Todo</button> 
    <button onClick={handleClearTodos} className="btn btn-outline-primary">Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
