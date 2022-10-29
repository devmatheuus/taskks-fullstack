import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { accountData } from '../../mocks/account/index';
import { loginData, invalidLoginData } from '../../mocks/session/index';

describe('/login', () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then(res => (connection = res))
            .catch(error => {
                console.error('Error during initialization', error);
            });

        await request(app).post('/accounts').send(accountData);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('POST /login - a token must be returned after successful login', async () => {
        const response = await request(app).post('/login').send(loginData);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('token');
    });

    test('POST /login - it should not be possible to login with invalid data', async () => {
        const response = await request(app)
            .post('/login')
            .send(invalidLoginData);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Incorrect email or password');
    });

    test('POST /login - username and password fields must be mandatory', async () => {
        const response = await request(app).post('/login').send({});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
            'email is a required field, password is a required field'
        );
    });
});
