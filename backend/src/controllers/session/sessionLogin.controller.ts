import { Request, Response } from 'express';
import { ISessionRequest } from '../../interfaces/sessions';
import sessionLoginService from '../../services/sessions/sessionsLogin.service';
import { ISessionResponse } from '../../interfaces/sessions/index';

const sessionLoginController = async (request: Request, response: Response) => {
    const { email, password }: ISessionRequest = request.loginData;

    const token: ISessionResponse = await sessionLoginService({
        email,
        password
    });

    return response.status(201).json(token);
};

export default sessionLoginController;
