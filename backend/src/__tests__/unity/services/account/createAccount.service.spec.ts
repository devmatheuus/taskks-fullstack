import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import createAccountService from '../../../../services/accounts/createAccount.service';
import { accountData } from '../../../mocks/account';

describe('Create an account', () => {
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

    test('Must enter a new account in the database', async () => {
        const response = await createAccountService(accountData);

        expect(response).toEqual(
            expect.objectContaining({
                email: accountData.email,
                id: response.id,
                is_admin: false
            })
        );

        expect(response).not.toContain('password');
    });
});
