import { AdminProvider } from './admin';
import { AuthProvider } from './auth';
import { DashProvider } from './dashboard/index';
import { IGenericChildren } from '../interfaces/childrenInterface';

const Providers = ({ children }: IGenericChildren) => {
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
