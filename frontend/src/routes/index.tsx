import { Switch, Route } from 'react-router-dom';

import GlobalStyle from '../styles/global';

import SignInPage from '../pages/signInPage';
import WelcomePage from '../pages/welcomePage';
import SignUpPage from '../pages/singUpPage/index';
import Dashboard from '../pages/dashboard/index';
import AdminDashboard from '../pages/adminDashboard/index';

const Routes = () => {
    return (
        <>
            <GlobalStyle />
            <Switch>
                <Route exact path="/">
                    <WelcomePage />
                </Route>
                <Route exact path="/signin">
                    <SignInPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
                <Route exact path="/dashboard/admin">
                    <AdminDashboard />
                </Route>
            </Switch>
        </>
    );
};

export default Routes;
