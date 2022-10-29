import { IAccountRequest } from '../../../interfaces/account';

export const accountData: IAccountRequest = {
    email: 'test@email.com',
    password: 'password'
};

export const otherAccountData: IAccountRequest = {
    email: 'other@email.com',
    password: 'password'
};

export const invalidAccountData: IAccountRequest = {
    email: 'invalidlengthinvalidlengthinvalidlengthinvalidlength@email.com',
    password: 'inv'
};
