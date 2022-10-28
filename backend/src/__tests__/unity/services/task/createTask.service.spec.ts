import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import { accountData } from '../../../mocks/account';
import createAccountService from '../../../../services/accounts/createAccount.service';
import createTaskService from '../../../../services/tasks/createTask.service';
import { createTask } from '../../../mocks/task/index';

describe('Create a task', () => {
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

    test('it should be possible to register a new task in the database', async () => {
        const account = await createAccountService(accountData);

        const response = await createTaskService(account.id, createTask);

        expect(response).toEqual(
            expect.objectContaining({
                id: response.id,
                description: response.description,
                deadline: response.deadline,
                finished_in: response.finished_in,
                is_late: response.is_late,
                is_finished: response.is_finished,
                created_at: response.created_at,
                updated_at: response.updated_at
            })
        );
        expect(response.account).not.toContain('password');
    });
});
