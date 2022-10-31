import image from '../../assets/signIn.svg';
import Button from '../../components/Button/style';
import { GenericContainer } from '../../components/GenericContainer/style';
import Input from '../../components/Input';

import { Link } from 'react-router-dom';

const SignInPage = () => {
    return (
        <GenericContainer>
            <p>Vamos organizar essa bagunça...</p>

            <div>
                <img src={image} alt="SignIn Image" />
            </div>

            <form>
                <Input placeholder="Insira seu email" label="Email" />
                <Input placeholder="Insira sua senha" label="Senha" />
                <Button type="submit">Entrar</Button>
            </form>

            <small>
                Ainda não se cadastrou?{' '}
                <Link to="/signup" style={{ color: 'var(--blue)' }}>
                    cadastre-se
                </Link>
            </small>
        </GenericContainer>
    );
};

export default SignInPage;
