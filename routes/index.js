const express = require('express');
const router = express.Router();

const todosController = require('../controllers/todos')

router.get('/todos', todosController.getTodos)
router.post('/todos', todosController.insertTodo)
router.put('/todos/:id', todosController.updateTodo)
router.delete('/todos/:id', todosController.deleteTodo)

module.exports=router
