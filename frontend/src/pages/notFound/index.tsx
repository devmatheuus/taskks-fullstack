import Button from '../../components/Button/style';
import notFound from '../../assets/notFound.gif';
import { NotFoundContainer } from './style';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();

    return (
        <NotFoundContainer>
            <div className="container-image">
                <img src={notFound} alt="Page not found" />
            </div>

            <p>A página que você está tentado acessar não existe.</p>
            <p>Volte para a página inicial</p>

            <Button onClick={() => history.push('/')}>
                Voltar para a tela inicial
            </Button>
        </NotFoundContainer>
    );
};

export default NotFound;
