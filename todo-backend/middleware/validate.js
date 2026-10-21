const mongoose = require('mongoose')

function badRequest(res, message) {
  return res.status(400).json({ error: message })
}

function validateId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return badRequest(res, 'Invalid task id')
  }
  next()
}

function validateTaskBody(req, res, next) {
  const { title, description, dueDate } = req.body
  if (typeof title !== 'string' || title.trim() === '') {
    return badRequest(res, 'Title is required')
  }
  if (description !== undefined && typeof description !== 'string') {
    return badRequest(res, 'Description must be text')
  }
  if (dueDate && isNaN(Date.parse(dueDate))) {
    return badRequest(res, 'Due date is not a valid date')
  }
  next()
}

function validateCompleted(req, res, next) {
  if (typeof req.body.completed !== 'boolean') {
    return badRequest(res, '"completed" must be true or false')
  }
  next()
}

module.exports = { validateId, validateTaskBody, validateCompleted }