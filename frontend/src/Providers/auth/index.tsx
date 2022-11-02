import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

interface IAuthProviderProps {
    children: ReactNode;
}

interface IUserData {
    email: string;
    password: string;
}

interface IAuthProvider {
    token: string;
    signIn: (userData: IUserData) => void;
    signUp: (userData: IUserData) => void;
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void;
}

const AuthContext = createContext<IAuthProvider>({} as IAuthProvider);

export const UseAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            return setAuthenticated(true);
        }
    }, [authenticated]);

    const [token, setToken] = useState(
        () => (localStorage.getItem('token') as string) || ''
    );

    const logout = () => {
        setAuthenticated(false);
        <Redirect to="/" />;
        localStorage.clear();
    };

    const signIn = (userData: IUserData) => {
        api.post('/login', userData)
            .then(response => {
                localStorage.setItem('token', response.data.token);

                setToken(response.data.token);

                toast.success('Login efetuado com sucesso!');
                setAuthenticated(true);

                setTimeout(() => {
                    history.push('/dashboard');
                }, 1000);
            })
            .catch(error => {
                toast.error('Email ou senha inválidos');
            });
    };

    const signUp = (userData: IUserData) => {
        api.post('/accounts', userData)
            .then(response => {
                toast.success('Cadastro efetuado com sucesso!');

                setTimeout(() => {
                    history.push('/');
                }, 1000);
            })
            .catch(error => {
                toast.error('Email ou senha inválidos');
            });
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                signIn,
                signUp,
                authenticated,
                setAuthenticated,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
