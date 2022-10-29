import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { accountData } from '../../mocks/account/index';
import { loginData } from '../../mocks/session/index';

describe('GET /tasks/admin', () => {
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

    test('only admins should use the /tasks/admin route', async () => {
        const { token } = login.body;

        const response = await request(app)
            .get('/tasks/admin')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('must be authenticated to use the route', async () => {
        const response = await request(app).get('/tasks/admin');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });

    test('to use the route the token must be valid', async () => {
        const response = await request(app)
            .get('/tasks/admin')
            .set('Authorization', 'Bearer invalidToken');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });
});
