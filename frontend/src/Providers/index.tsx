import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { DashProvider } from './dashboard/index';

interface IProviderProps {
    children: ReactNode;
}

const Providers = ({ children }: IProviderProps) => {
    return (
        <>
            <DashProvider>
                <AuthProvider>{children}</AuthProvider>
            </DashProvider>
        </>
    );
};

export default Providers;
