const request = require('supertest');
const HttpServer = require('../http/http_server');
const todoService = require('../services/todo.service');

describe('Todo API Tests', () => {
    let server;
    let createdTodoId;

    // Setup server before tests
    beforeAll(async () => {
        server = new HttpServer({ port: 3333 });
        server.start();
    });

    // Close server after tests
    afterAll(async () => {
        await new Promise((resolve) => {
            server.stop(resolve);
        });
    });

    // Test tạo todo mới
    test('should create a new todo', async () => {
        const todoData = {
            title: 'Test Todo',
            description: 'Test Description',
            dueDate: '2024-03-20T00:00:00.000Z'
        };

        const response = await request(server.getApp())
            .post('/api/todos')
            .send(todoData)
            .expect(201);

        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.title).toBe(todoData.title);
        createdTodoId = response.body.data.id;
    });

    // Test lấy danh sách todos
    test('should get all todos', async () => {
        const response = await request(server.getApp())
            .get('/api/todos')
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Test lấy todos theo trạng thái
    test('should get todos by completion status', async () => {
        const response = await request(server.getApp())
            .get('/api/todos?completed=false')
            .expect(200);

        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Test cập nhật todo
    test('should update a todo', async () => {
        const updateData = {
            title: 'Updated Todo',
            description: 'Updated Description'
        };

        const response = await request(server.getApp())
            .put(`/api/todos/${createdTodoId}`)
            .send(updateData)
            .expect(200);

        expect(response.body.data.title).toBe(updateData.title);
    });

    // Test đánh dấu hoàn thành
    test('should mark todo as completed', async () => {
        const response = await request(server.getApp())
            .put(`/api/todos/${createdTodoId}`)
            .send({ completed: true })
            .expect(200);

        expect(response.body.data.completed).toBe(true);
    });

    // Test xóa todo
    test('should delete a todo', async () => {
        await request(server.getApp())
            .delete(`/api/todos/${createdTodoId}`)
            .expect(200);

        // Verify todo is deleted
        const response = await request(server.getApp())
            .get(`/api/todos/${createdTodoId}`)
            .expect(404);
    });

    // Test validation errors
    test('should return 400 for invalid todo data', async () => {
        const invalidData = {
            description: 'Missing title'
        };

        const response = await request(server.getApp())
            .post('/api/todos')
            .send(invalidData)
            .expect(400);

        expect(response.body.error).toBeDefined();
    });

    // Test not found error
    test('should return 404 for non-existent todo', async () => {
        const response = await request(server.getApp())
            .get('/api/todos/999999')
            .expect(404);

        expect(response.body.error).toBeDefined();
    });
});
