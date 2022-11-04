import AppDataSource from '../../data-source';

import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { AppError } from '../../errors/AppError';
import { ISessionRequest } from '../../interfaces/sessions/index';
import { Account } from '../../entities/account.entity';

const sessionLoginService = async ({ email, password }: ISessionRequest) => {
    const accountRepository = AppDataSource.getRepository(Account);

    const account = await accountRepository.findOneBy({ email });

    if (!account) throw new AppError(400, 'Incorrect email or password');

    const matchPassword = await compare(password, account.password);

    if (!matchPassword) throw new AppError(400, 'Incorrect email or password');

    const token = jwt.sign(
        {
            is_admin: account.is_admin
        },
        process.env.SECRET_KEY as string,
        {
            subject: account.id,
            expiresIn: '2h'
        }
    );

    return { token: token };
};

export default sessionLoginService;
