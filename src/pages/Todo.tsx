import { useState, type ChangeEvent, type FormEvent } from 'react'
import "../CSSpages/Todo.css"

const Todo = () => {
  const [todos, setTodos] = useState([  
    {
    id: 1,
    title: 'go to gym',
    isCompleted: false,
  },
  {
    id: 2,
    title: 'To finish React Assignments',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'purchase groceries',
    isCompleted: false,
  }
  ])
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null)
  const [newTask, setNewTask] = useState('')

  const handleNewTask = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newTask.trim()) {
      alert('input can not be empty')
      return
    }
    
    if(isEditing){
      const updateTodo = todos.map(todo => todo.id === currentTodoId? {...todo, title:newTask}:todo)
      setTodos(updateTodo)
      setIsEditing(false)
      setCurrentTodoId(null)
    }else{
      const newTodo = {
        id: todos.length+1,
        title: newTask,
        isCompleted: false
      }
      setTodos([newTodo, ...todos])
    }
    setNewTask('')
  }

  const handleDeleteTodo = (text: string) => {
    const delTodo = todos.filter((todo) => todo.title !== text)
    setTodos(delTodo)
  }

  const handleCompleted = (id: number) => {
    const updateTodos = todos.map(todo => todo.id === id? {...todo, isCompleted: !todo.isCompleted} : todo)
    setTodos(updateTodos)
  }

  return (
    <div>
      <form action="" className="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="todo">What you want to do?</label>
        <input
          type="text"
          value={newTask}
          onChange={handleNewTask}
          id="todo"
          placeholder="type your todo"
        />
        <button type="submit">{isEditing? "Update Todo": "Submit"}</button>
      </form>

      {todos.length > 0 ? (
        <>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.isCompleted? "completed": ""}>
              <input type="checkbox" checked={todo.isCompleted} onChange={() => handleCompleted(todo.id)} />
              <span>{todo.title}</span>
              <button onClick={() => handleDeleteTodo(todo.title)}>Delete</button>
              <button onClick={()=>{
                setNewTask(todo.title)
                setIsEditing(true)
                setCurrentTodoId(todo.id)
              }}>Edit</button>
            </li>
          ))}
        </>
      ) : (
        <p>You don't have any todo</p>
      )}
    </div>
  )
}

export default Todo