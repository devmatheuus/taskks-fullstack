import * as express from 'express';
import { IAccountRequest } from '../../src/interfaces/account/index';
import { ISessionRequest } from '../../backend/src/interfaces/sessions/index';
import { ICreateTaskRequest } from '../../backend/src/interfaces/task/index';
import { IAccountPayload } from '../../backend/src/interfaces/account/index';

declare global {
    namespace Express {
        interface Request {
            newAccount: IAccountRequest;
            loginData: ISessionRequest;
            taskData: ICreateTaskRequest;
            accountData: IAccountPayload;
        }
    }
}
