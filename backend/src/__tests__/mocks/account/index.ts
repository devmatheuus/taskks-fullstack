import { IAccountRequest } from '../../../interfaces/account';

export const accountData: IAccountRequest = {
    email: 'test@email.com',
    password: '1234'
};

export const invalidAccountData: IAccountRequest = {
    email: 'invalidlengthinvalidlengthinvalidlengthinvalidlength@email.com',
    password: '1234'
};
