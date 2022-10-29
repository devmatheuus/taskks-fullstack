import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { accountData, otherAccountData } from '../../mocks/account/index';
import { loginData, otherAccountLogin } from '../../mocks/session/index';
import { createTask, istNotLate, lateTask } from '../../mocks/task/index';

describe('GET /tasks', () => {
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
        await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(createTask);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('the task creator should be able to view them', async () => {
        const { token } = login.body;

        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(1);
    });

    test('a user should not be able to list tasks that do not belong to him', async () => {
        await request(app).post('/accounts').send(otherAccountData);

        const loginOtherAccount = await request(app)
            .post('/login')
            .send(otherAccountLogin);

        const { token } = loginOtherAccount.body;

        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.tasks).toHaveLength(0);
    });

    test('to list the tasks the user must be authenticated', async () => {
        const response = await request(app).get('/tasks');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('it should not be possible to list tasks with an invalid token', async () => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', 'Bearer invalidToken');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('the task creator should be able to view them', async () => {
        const { token } = login.body;

        const task = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(createTask);

        await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(lateTask);

        await request(app)
            .patch(`/tasks/${task.body.task.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(istNotLate);

        const listTask = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(listTask.status).toBe(200);
        expect(listTask.body.tasks[1].is_late).toBe(false);
    });
});
