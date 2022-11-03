import React, { ReactNode } from 'react';
import { AdminProvider } from './admin';
import { AuthProvider } from './auth';
import { DashProvider } from './dashboard/index';

interface IProviderProps {
    children: ReactNode;
}

const Providers = ({ children }: IProviderProps) => {
    return (
        <>
            <DashProvider>
                <AuthProvider>
                    <AdminProvider>{children}</AdminProvider>
                </AuthProvider>
            </DashProvider>
        </>
    );
};

export default Providers;
