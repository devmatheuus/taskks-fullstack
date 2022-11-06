import { createContext, useContext, useState, useEffect } from 'react';

import { useHistory, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import jwt_decode from 'jwt-decode';

import { IUserData, jwtPayload } from '../../interfaces/auth/index';
import { IAuthProvider } from '../../interfaces/auth/provider';
import { IGenericChildren } from '../../interfaces/childrenInterface';

const AuthContext = createContext<IAuthProvider>({} as IAuthProvider);

export const UseAuth = () => {
    const context = useContext(AuthContext);

    return context;
};

export const AuthProvider = ({ children }: IGenericChildren) => {
    const [authenticated, setAuthenticated] = useState(false);

    const [token, setToken] = useState(
        () => (localStorage.getItem('token') as string) || ''
    );

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            return setAuthenticated(true);
        }
    }, [authenticated]);

    const logout = () => {
        setAuthenticated(false);

        <Redirect to="/" />;

        localStorage.clear();
    };

    const signIn = (userData: IUserData) => {
        toast.loading('Conectando...');

        api.post('/login', userData)
            .then(response => {
                localStorage.setItem('token', response.data.token);

                setToken(response.data.token);

                toast.dismiss();
                toast.success('Login efetuado com sucesso!');

                setAuthenticated(true);

                const isAdmin: jwtPayload = jwt_decode(response.data.token);

                setTimeout(() => {
                    if (isAdmin.is_admin === true) {
                        return history.push('/dashboard/admin');
                    } else {
                        return history.push('/dashboard');
                    }
                }, 1000);
            })
            .catch(error => {
                toast.dismiss();
                toast.error('Email ou senha inválidos');
            });
    };

    const signUp = (userData: IUserData) => {
        toast.loading('Criando conta...');

        api.post('/accounts', userData)
            .then(response => {
                toast.dismiss();
                toast.success('Cadastro efetuado com sucesso!');

                setTimeout(() => {
                    history.push('/signin');
                }, 1000);
            })
            .catch(error => {
                toast.dismiss();
                toast.error('Email já cadastrado');
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
