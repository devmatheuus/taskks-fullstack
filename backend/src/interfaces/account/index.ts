export interface IAccountRequest {
    email: string;
    password: string;
}

export interface IAccountResponse extends IAccountRequest {
    id: string;
    is_admin: boolean;
}
