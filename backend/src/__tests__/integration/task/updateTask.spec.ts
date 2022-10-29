import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { accountData, otherAccountData } from '../../mocks/account/index';
import { loginData, otherAccountLogin } from '../../mocks/session/index';
import {
    updateDescription,
    updateTask,
    lateTask
} from '../../mocks/task/index';
import { createTask } from '../../mocks/task/index';

describe('/tasks', () => {
    let connection: DataSource;

    let login: any;
    let task: any;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then(res => (connection = res))
            .catch(error => {
                console.error('Error during initialization', error);
            });

        await request(app).post('/accounts').send(accountData);

        login = await request(app).post('/login').send(loginData);

        const { token } = login.body;

        task = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(createTask);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('it should be possible to update a task', async () => {
        const { token } = login.body;

        const response = await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateDescription);

        const listTask = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(listTask.body.tasks[0].description).toEqual(
            updateDescription.description
        );
    });

    test('the app should tell you if the task was late', async () => {
        const { token } = login.body;

        const response = await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(lateTask);

        const listTask = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(listTask.body.tasks[0].is_late).toBe(true);
    });

    test('must mark the time that the task was completed', async () => {
        const { token } = login.body;

        const response = await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateTask);

        const listTask = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(listTask.body.tasks[0].is_finished).toBe(true);
        expect(listTask.body.tasks[0].finished_in).toBeDefined();
    });

    test('only the task creator should be able to update it', async () => {
        await request(app).post('/accounts').send(otherAccountData);

        const accountLogin = await request(app)
            .post('/login')
            .send(otherAccountLogin);

        const response = await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${accountLogin.body.token}`)
            .send(updateTask);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Unauthorized.');
    });

    test('it should not be possible to update a finished task', async () => {
        const { token } = login.body;

        await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateTask);

        const response = await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateTask);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
            'This task has already been completed.'
        );
    });

    test('it should not be possible to update a task without being authenticated', async () => {
        const response = await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .send(updateTask);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('it should not be possible to update a task that does not exist', async () => {
        const { token } = login.body;

        const response = await request(app)
            .patch('/tasks/invalidTaskId')
            .set('Authorization', `Bearer ${token}`)
            .send(updateTask);

        expect(response.status).toBe(400);
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
