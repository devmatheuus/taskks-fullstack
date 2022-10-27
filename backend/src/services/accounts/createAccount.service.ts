import AppDataSource from '../../data-source';

import { Account } from '../../entities/account.entity';
import { AppError } from '../../errors/AppError';
import { IAccountRequest } from '../../interfaces/account/index';

const createAccountService = async ({ email, password }: IAccountRequest) => {
    const accountRepository = AppDataSource.getRepository(Account);

    const emailAlreadyExists = await accountRepository.findOneBy({ email });

    if (emailAlreadyExists) {
        throw new AppError(400, 'Email already registered.');
    }

    const account = accountRepository.create({
        email,
        password
    });

    await accountRepository.save(account);

    return account;
};

export default createAccountService;
