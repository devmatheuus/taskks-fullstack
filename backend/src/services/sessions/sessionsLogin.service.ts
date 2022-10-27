import AppDataSource from '../../data-source';
import { compare } from 'bcryptjs';
import { AppError } from '../../errors/AppError';
import { ISessionRequest } from '../../interfaces/sessions/index';
import { Account } from '../../entities/account.entity';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const sessionLoginService = async ({ email, password }: ISessionRequest) => {
    const accountRepository = AppDataSource.getRepository(Account);

    const account = await accountRepository.findOneBy({ email });

    if (!account) throw new AppError(403, 'Incorrect email or password');

    const matchPassword = await compare(password, account.password);

    if (!matchPassword) throw new AppError(403, 'Incorrect email or password');

    const token = jwt.sign(
        {
            isAdmin: account.is_admin
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