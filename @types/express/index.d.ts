import * as express from 'express';
import { IAccountRequest } from '../../src/interfaces/account/index';
import { ISessionRequest } from '../../backend/src/interfaces/sessions/index';

declare global {
    namespace Express {
        interface Request {
            newAccount: IAccountRequest;
            loginData: ISessionRequest;
        }
    }
}
