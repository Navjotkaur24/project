const express = require('express')
const controller = require('../controllers/taskController')
const { validateId, validateTaskBody, validateCompleted } = require('../middleware/validate')

const router = express.Router()

router.post('/', validateTaskBody, controller.create)
router.get('/', controller.list)
router.delete('/completed', controller.clearCompleted) // must come before /:id
router.get('/:id', validateId, controller.getOne)
router.put('/:id', validateId, validateTaskBody, controller.update)
router.patch('/:id/complete', validateId, validateCompleted, controller.complete)
router.delete('/:id', validateId, controller.remove)

module.exports = router