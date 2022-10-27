import createAccountService from '../../../../services/accounts/createAccount.service';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import { accountData } from '../../../mocks/account';
import { invalidAccountData } from '../../../mocks/account/index';

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
        const newAccount = await createAccountService(accountData);

        expect(newAccount).toEqual(
            expect.objectContaining({
                email: accountData.email,
                password: accountData.password,
                id: newAccount.id,
                is_admin: false
            })
        );
    });
});
