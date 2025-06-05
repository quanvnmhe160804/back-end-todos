const todoService = require('../services/todo.service');
const { successResponse, errorResponse } = require('../dto/res');
const { createTodoDto, updateTodoDto } = require('../dto/todo.dto');

async function getTodos(req, res) {
  try {
    const { completed } = req.query;

    let isCompleted;
    if (completed === 'true') isCompleted = 1;
    else if (completed === 'false') isCompleted = 0;

    const todos = await todoService.getAllTodos({ is_completed: isCompleted });
    res.json(successResponse(todos));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }

}

async function insertTodo(req, res) {
  try {
    const payload = createTodoDto(req.body);
    const todo = await todoService.createTodo(payload);
    res.status(201).json(successResponse(todo, 'Todo created success'));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const payload = updateTodoDto(req.body);
    
    if (Object.keys(payload).length === 0) {
      return res.status(400).json(errorResponse('No valid fields to update'));
    }

    const todo = await todoService.updateTodo(id, payload);
    if (!todo) {
      return res.status(404).json(errorResponse('Todo not found'));
    }

    res.json(successResponse(todo, 'Todo updated successfully'));
  } catch (error) {
    res.status(400).json(errorResponse(error.message));
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;
    const result = await todoService.deleteTodo(id);
    
    if (!result) {
      return res.status(404).json(errorResponse('Todo not found'));
    }

    res.json(successResponse(null, 'Todo deleted successfully'));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
}

module.exports = {
  getTodos,
  insertTodo,
  updateTodo,
  deleteTodo
};

