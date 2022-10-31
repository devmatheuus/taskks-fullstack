import { ReactNode } from 'react';
import { AuthProvider } from './auth';

interface IProviderProps {
    children: ReactNode;
}

const Providers = ({ children }: IProviderProps) => {
    return (
        <>
            <AuthProvider>{children}</AuthProvider>
        </>
    );
};

export default Providers;
