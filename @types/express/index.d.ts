import * as express from 'express';
import { IAccountRequest } from '../../src/interfaces/account/index';

declare global {
    namespace Express {
        interface Request {
            newAccount: IAccountRequest;
        }
    }
}
