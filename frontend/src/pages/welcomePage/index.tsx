import image from '../../assets/welcomePage.svg';

import { Link } from 'react-router-dom';

import { Container } from './style';
import Button from '../../components/Button/style';
import Logo from '../../components/Logo';

const WelcomePage = () => {
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
