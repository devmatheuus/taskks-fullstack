import { IUserData } from '../index';

export interface IAuthProvider {
    token: string;

    signIn: (userData: IUserData) => void;
    signUp: (userData: IUserData) => void;
    logout: () => void;

    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
