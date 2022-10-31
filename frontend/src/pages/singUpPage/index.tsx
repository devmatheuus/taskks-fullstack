import { Link } from 'react-router-dom';
import image from '../../assets/signUp.svg';
import Button from '../../components/Button/style';
import { GenericContainer } from '../../components/GenericContainer/style';
import Input from '../../components/Input';

const SignUpPage = () => {
    return (
        <GenericContainer>
            <p>Vamos juntos nessa!</p>

            <div>
                <img src={image} alt="SignIn Image" />
            </div>

            <form>
                <Input placeholder="Seu melhor email" label="Email" />
                <Input placeholder="Uma senha bem forte" label="Senha" />
                <Button type="submit">Cadastrar</Button>
            </form>

            <small>
                Já possui uma conta?{' '}
                <Link to="/signin" style={{ color: 'var(--blue)' }}>
                    Entre
                </Link>
            </small>
        </GenericContainer>
    );
};

export default SignUpPage;
