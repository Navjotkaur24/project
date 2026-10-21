import { useState } from 'react'

function TaskItem({ task, onToggle, onDelete, onSave }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)

  function save() {
    onSave(task._id, { title, description })
    setEditing(false)
  }

  return (
    <li className={`task ${task.completed ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
      />

      {editing ? (
        <div className="edit">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      ) : (
        <div className="info">
          <strong>{task.title}</strong>
          {task.description && <p>{task.description}</p>}
          {task.dueDate && <small>Due: {task.dueDate.slice(0, 10)}</small>}
        </div>
      )}

      <div className="actions">
        {editing ? (
          <button onClick={save}>Save</button>
        ) : (
          <button onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem