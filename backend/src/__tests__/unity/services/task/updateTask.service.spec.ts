import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import { accountData } from '../../../mocks/account';
import createAccountService from '../../../../services/accounts/createAccount.service';
import createTaskService from '../../../../services/tasks/createTask.service';
import { createTask, updateTask } from '../../../mocks/task/index';
import updateTaskService from '../../../../services/tasks/updateTask.service';

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

    test('it should be possible to update a task', async () => {
        const account = await createAccountService(accountData);

        const task = await createTaskService(account.id, createTask);

        const response = await updateTaskService(task.id, updateTask);

        expect(response).toEqual(true);
    });
});
