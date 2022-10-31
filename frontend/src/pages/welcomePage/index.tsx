import { Link } from 'react-router-dom';
import image from '../../assets/welcomePage.svg';
import Button from '../../components/Button/style';
import { Container } from './style';

const WelcomePage = () => {
    return (
        <Container>
            <div>
                <p>Bem vindo ao</p>
                <h1>TASKK´S</h1>
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
