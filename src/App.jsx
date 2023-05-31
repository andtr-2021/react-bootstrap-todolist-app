import { useEffect, useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("Items")
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })

  useEffect(() => { localStorage.setItem("Items", JSON.stringify(todos))} , [todos])


  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [...currentTodos, {id : crypto.randomUUID(), title: newItem, completed : false},  ]
    })

    setNewItem("")
  }

  function toggleTodo (id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo (id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
  <>
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className="formRow">
      <label htmlFor="newItemInput">NEW ITEMS</label><br />
      <input value = {newItem} onChange={e => setNewItem(e.target.value)} id="newItemInput" type="text" />
    </div>
    <button className="btn">Add</button>
  </form>
  <h3 className="header">To-do List</h3>
  <ul className="list">
    {todos.length === 0 && <li className="empty">No items in the list</li>}
    {todos.map(todo => {
      return (
        <li key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
            {todo.title}
            <button className="deleteBtn" onClick={() => deleteTodo(todo.id) }>Delete</button>
          </label>
        </li>
      )
    })}
  </ul>
  </>
  )
}
