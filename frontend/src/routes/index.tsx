import { Switch, Route } from 'react-router-dom';
import SignInPage from '../pages/signInPage';

import WelcomePage from '../pages/welcomePage';
import GlobalStyle from '../styles/global';
import SignUpPage from '../pages/singUpPage/index';

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
            </Switch>
        </>
    );
};

export default Routes;
