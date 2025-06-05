
const todoRepository = require('../repo/todo_repo');

const TodoService = {
  
  async getAllTodos(filter = {}) {
    return await todoRepository.getAll(filter);
  },

  async getTodoById(id) {
    return await todoRepository.getById(id); 
  },

  async createTodo(todoData) {
    if (!todoData.title) {
      throw new Error('Title is required');
    }
    const now = new Date();
    const due = new Date(todoData.due_date);
  
    if (isNaN(due.getTime())) {
      throw new Error('Invalid due date');
    }
  
    if (due < now) {
      throw new Error('Due date must be in the future');
    }
    return await todoRepository.create(todoData);
  },

  async updateTodo(id, todoData) {
    if (!todoData.title) {
      throw new Error('Title is required');
    }
    return await todoRepository.update(id, todoData);
  },

  async deleteTodo(id) {
    return await todoRepository.remove(id); // sửa đúng tên hàm
  }
};

module.exports = TodoService;
