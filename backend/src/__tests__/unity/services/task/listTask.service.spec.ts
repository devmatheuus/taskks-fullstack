import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import { accountData } from '../../../mocks/account';
import createAccountService from '../../../../services/accounts/createAccount.service';
import createTaskService from '../../../../services/tasks/createTask.service';
import { createTask, updateTask } from '../../../mocks/task/index';
import updateTaskService from '../../../../services/tasks/updateTask.service';
import listTaskService from '../../../../services/tasks/listTasks.service';
import { otherAccountData } from '../../../mocks/account/index';

describe('List tasks', () => {
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

    test('it should be possible to list the tasks registered in the database', async () => {
        const account = await createAccountService(accountData);
        const otherAccount = await createAccountService(otherAccountData);

        for (let index = 0; index < 3; index++) {
            await createTaskService(account.id, createTask);
        }

        const response = await listTaskService(account.id);
        const emptyResponse = await listTaskService(otherAccount.id);

        expect(emptyResponse).toHaveLength(0);
        expect(response).toHaveLength(3);
        expect(response[0].account).not.toContain('password');
    });
});
