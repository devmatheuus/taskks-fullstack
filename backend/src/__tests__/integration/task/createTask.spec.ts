import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { accountData } from '../../mocks/account/index';
import { loginData } from '../../mocks/session/index';
import {
    createTask,
    invalidDeadline,
    invalidDescription
} from '../../mocks/task/index';

describe('POST - /tasks', () => {
    let connection: DataSource;

    let login: any;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then(res => (connection = res))
            .catch(error => {
                console.error('Error during initialization', error);
            });
        await request(app).post('/accounts').send(accountData);
        login = await request(app).post('/login').send(loginData);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('it should be possible to create a task', async () => {
        const { token } = login.body;

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(createTask);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('task');
        expect(response.body.task).toHaveProperty('account');
        expect(response.body.task.is_finished).toEqual(false);
        expect(response.body.task.finished_in).toEqual(null);
        expect(response.body.task.description).toEqual(createTask.description);
        expect(response.body.task.description).toEqual(createTask.description);
        expect(response.body.task.account).not.toHaveProperty('password');
    });

    test('the description field must be a string', async () => {
        const { token } = login.body;

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidDescription);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    test('the date field must be a valid date in the format dd/MM/yyyy', async () => {
        const { token } = login.body;

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidDeadline);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    test('the description and deadline fields must be mandatory', async () => {
        const { token } = login.body;

        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    test('it should not be possible to create a task without being authenticated', async () => {
        const response = await request(app).post('/tasks').send(createTask);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('it should not be possible to create a task with an invalid token', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', 'Bearer invalidToken')
            .send(createTask);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });
});
