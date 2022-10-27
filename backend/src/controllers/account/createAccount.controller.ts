import { Request, Response } from 'express';

import {
    IAccountRequest,
    IAccountResponse
} from '../../interfaces/account/index';

import createAccountService from '../../services/accounts/createAccount.service';

const createAccountController = async (
    request: Request,
    response: Response
) => {
    const { email, password }: IAccountRequest = request.newAccount;

    const account: IAccountResponse = await createAccountService({
        email,
        password
    });

    return response
        .status(201)
        .json({ message: 'Account created successfully', account: account });
};

export default createAccountController;
