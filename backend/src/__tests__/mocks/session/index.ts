import { ISessionRequest } from '../../../interfaces/sessions/index';

export const loginData: ISessionRequest = {
    email: 'test@email.com',
    password: 'password'
};

export const otherAccountLogin: ISessionRequest = {
    email: 'other@email.com',
    password: 'password'
};

export const invalidLoginData: ISessionRequest = {
    email: 'invalid@email.com',
    password: 'invalid'
};
