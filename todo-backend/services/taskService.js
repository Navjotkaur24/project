const Task = require('../models/Task')

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function createTask(data) {
  return Task.create({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
  })
}

async function getTasks({ completed, search }) {
  const filter = {}
  if (completed !== undefined) filter.completed = completed === 'true'
  if (search) filter.title = { $regex: escapeRegex(search), $options: 'i' }
  return Task.find(filter).sort({ createdAt: -1 })
}

async function getTaskById(id) {
  return Task.findById(id)
}

async function updateTask(id, data) {
  return Task.findByIdAndUpdate(
    id,
    { title: data.title, description: data.description, dueDate: data.dueDate },
    { new: true, runValidators: true }
  )
}

async function setCompleted(id, completed) {
  return Task.findByIdAndUpdate(id, { completed }, { new: true })
}

async function deleteTask(id) {
  return Task.findByIdAndDelete(id)
}

async function deleteCompleted() {
  const result = await Task.deleteMany({ completed: true })
  return result.deletedCount
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  setCompleted,
  deleteTask,
  deleteCompleted,
}