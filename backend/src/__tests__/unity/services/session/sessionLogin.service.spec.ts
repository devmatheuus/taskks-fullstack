import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import sessionLoginService from '../../../../services/sessions/sessionsLogin.service';
import { accountData } from '../../../mocks/account';
import { loginData } from '../../../mocks/session';
import createAccountService from '../../../../services/accounts/createAccount.service';

describe('Login', () => {
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

    test('It must be possible to login with valid data', async () => {
        await createAccountService(accountData);

        const response = await sessionLoginService(loginData);

        expect(response).toEqual(
            expect.objectContaining({
                token: response.token
            })
        );

        expect(response.token).toHaveLength(211);
    });
});
