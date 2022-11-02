import { Link, Redirect } from 'react-router-dom';
import image from '../../assets/welcomePage.svg';
import Button from '../../components/Button/style';
import { Container } from './style';
import Logo from '../../components/Logo';

import { UseAuth } from '../../Providers/auth';

const WelcomePage = () => {
    const { authenticated } = UseAuth();

    if (authenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container>
            <div>
                <p>Bem vindo ao</p>
                <Logo />
            </div>
            <div>
                <img src={image} alt="Welcome Image" />
            </div>

            <p className="message">
                Mantenha o controle das coisas que você tem que fazer em sua
                rotina diária
            </p>

            <Link to="/signin">
                <Button>Iniciar</Button>
            </Link>
        </Container>
    );
};

export default WelcomePage;
