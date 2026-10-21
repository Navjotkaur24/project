const service = require('../services/taskService')

function notFound() {
  const err = new Error('Task not found')
  err.status = 404
  return err
}

async function create(req, res) {
  const task = await service.createTask(req.body)
  res.status(201).json(task)
}

async function list(req, res) {
  const tasks = await service.getTasks(req.query)
  res.status(200).json(tasks)
}

async function getOne(req, res) {
  const task = await service.getTaskById(req.params.id)
  if (!task) throw notFound()
  res.status(200).json(task)
}

async function update(req, res) {
  const task = await service.updateTask(req.params.id, req.body)
  if (!task) throw notFound()
  res.status(200).json(task)
}

async function complete(req, res) {
  const task = await service.setCompleted(req.params.id, req.body.completed)
  if (!task) throw notFound()
  res.status(200).json(task)
}

async function remove(req, res) {
  const task = await service.deleteTask(req.params.id)
  if (!task) throw notFound()
  res.status(200).json({ message: 'Task deleted' })
}

async function clearCompleted(req, res) {
  const deletedCount = await service.deleteCompleted()
  res.status(200).json({ message: 'Completed tasks cleared', deletedCount })
}

module.exports = { create, list, getOne, update, complete, remove, clearCompleted }