import Header from '../../components/Header';
import AdminList from '../../components/AdminList/index';

import { UseAuth } from '../../Providers/auth';

import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { jwtPayload } from '../../interfaces/auth/index';

const AdminDashboard = () => {
    const { authenticated, token } = UseAuth();

    const account: jwtPayload = jwt_decode(token);

    if (account.is_admin === false) {
        return <Redirect to="/dashboard" />;
    }

    if (!authenticated) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Header />
            <AdminList />
        </>
    );
};

export default AdminDashboard;
