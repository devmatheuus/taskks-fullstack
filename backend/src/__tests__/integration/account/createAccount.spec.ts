import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { accountData, invalidAccountData } from '../../mocks/account/index';

describe('POST - /accounts', () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then(res => (connection = res))
            .catch(error => {
                console.error('Error during initialization', error);
            });
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test('POST /accounts - It must be possible to create an account', async () => {
        const response = await request(app).post('/accounts').send(accountData);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('account');
        expect(response.body.account).toHaveProperty('email');
        expect(response.body.account).toHaveProperty('id');
        expect(response.body.account).toHaveProperty('is_admin');
        expect(response.body.account).not.toHaveProperty('password');
    });

    test('POST /accounts - It should not be possible to create an account with an email that is already in use', async () => {
        const response = await request(app).post('/accounts').send(accountData);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual('Email already registered.');
    });

    test('POST /accounts - It should not be possible to create an account with invalid data', async () => {
        const response = await request(app)
            .post('/accounts')
            .send(invalidAccountData);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message');
    });

    test('POST /accounts - email and password fields must be mandatory', async () => {
        const response = await request(app).post('/accounts').send({});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toEqual(
            'email is a required field, password is a required field'
        );
    });
});
