import { useState, useEffect } from 'react'
import {
  fetchTasks,
  createTask,
  updateTask,
  setCompleted,
  deleteTask,
  clearCompleted,
  errorMessage,
} from './api'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  async function loadTasks() {
    setLoading(true)
    setError('')
    try {
      const params = {}
      if (search) params.search = search
      if (filter !== 'all') params.completed = filter === 'completed'
      setTasks(await fetchTasks(params))
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [search, filter])

  async function run(action) {
    try {
      setError('')
      await action()
      await loadTasks()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <TaskForm onAdd={(task) => run(() => createTask(task))} />

      <div className="toolbar">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => run(clearCompleted)}>Clear completed</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {!loading && tasks.length === 0 && !error && <p>No tasks found.</p>}

      <ul className="list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={(id, done) => run(() => setCompleted(id, done))}
            onDelete={(id) => run(() => deleteTask(id))}
            onSave={(id, data) => run(() => updateTask(id, data))}
          />
        ))}
      </ul>
    </div>
  )
}

export default App