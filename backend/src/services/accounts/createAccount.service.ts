import AppDataSource from '../../data-source';

import { hash } from 'bcryptjs';

import { Account } from '../../entities/account.entity';
import { AppError } from '../../errors/AppError';
import { IAccountRequest } from '../../interfaces/account/index';

const createAccountService = async (accountData: IAccountRequest) => {
    const accountRepository = AppDataSource.getRepository(Account);

    const emailAlreadyExists = await accountRepository.findOneBy({
        email: accountData.email
    });

    if (emailAlreadyExists) {
        throw new AppError(400, 'Email already registered.');
    }

    const hashedPassword = await hash(accountData.password, 10);

    const account = accountRepository.create({
        email: accountData.email,
        password: hashedPassword
    });

    await accountRepository.save(account);

    const { password, ...accountCreated } = account;

    return accountCreated;
};

export default createAccountService;
