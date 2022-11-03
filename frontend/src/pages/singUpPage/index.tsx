import { Link, Redirect } from 'react-router-dom';
import image from '../../assets/signUp.svg';
import Button from '../../components/Button/style';
import { GenericContainer } from '../../components/GenericContainerStyle/style';
import Input from '../../components/Input';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseAuth } from '../../Providers/auth/index';
import { Span } from '../../components/Span/style';
import { formSchema } from '../../schemas/session/index';

interface IUserData {
    email: string;
    password: string;
}

const SignUpPage = () => {
    const { signUp, authenticated } = UseAuth();

    if (authenticated) {
        return <Redirect to="/dashboard" />;
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IUserData>({
        resolver: yupResolver(formSchema)
    });

    const onSubmitFunction = async (data: IUserData) => {
        signUp(data);
    };

    return (
        <GenericContainer>
            <p>Cadastre-se e vamos juntos nessa!</p>

            <div>
                <img src={image} alt="SignIn Image" />
            </div>

            <form onSubmit={handleSubmit(onSubmitFunction)}>
                <Input
                    placeholder="Seu melhor email"
                    label="Email"
                    register={register}
                    name="email"
                />
                {errors.email?.message && <Span>{errors.email?.message}</Span>}

                <Input
                    placeholder="Uma senha bem forte"
                    label="Senha"
                    type="password"
                    register={register}
                    name="password"
                />
                {errors.password?.message && (
                    <Span>{errors.password?.message}</Span>
                )}

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
