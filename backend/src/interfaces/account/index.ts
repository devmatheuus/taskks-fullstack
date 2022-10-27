export interface IAccountRequest {
    email: string;
    password: string;
}

export interface IAccountResponse {
    id: string;
    is_admin: boolean;
    email: string;
}
