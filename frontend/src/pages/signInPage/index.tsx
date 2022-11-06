import image from '../../assets/signIn.svg';

import { GenericContainer } from '../../components/GenericContainerStyle/style';
import { Span } from '../../components/Span/style';
import Button from '../../components/Button/style';
import Input from '../../components/Input';

import { Link, Redirect } from 'react-router-dom';
import { useForm as UseForm } from 'react-hook-form';

import { formSchema } from '../../schemas/session/index';

import { UseAuth } from '../../Providers/auth/index';

import { IUserData } from '../../interfaces/auth';
import { yupResolver } from '@hookform/resolvers/yup';

const SignInPage = () => {
    const { signIn, authenticated } = UseAuth();

    if (authenticated) {
        return <Redirect to="/dashboard" />;
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = UseForm<IUserData>({
        resolver: yupResolver(formSchema)
    });

    const onSubmitFunction = async (data: IUserData) => {
        signIn(data);
    };

    return (
        <GenericContainer>
            <p>Vamos organizar essa bagunça...</p>

            <div className="container-image">
                <img src={image} alt="SignIn" />
            </div>

            <form onSubmit={handleSubmit(onSubmitFunction)}>
                <Input
                    placeholder="Insira seu email"
                    label="Email"
                    register={register}
                    name="email"
                />
                {errors.email?.message && <Span>{errors.email?.message}</Span>}

                <Input
                    placeholder="Insira sua senha"
                    label="Senha"
                    register={register}
                    name="password"
                    type="password"
                />
                {errors.password?.message && (
                    <Span>{errors.password?.message}</Span>
                )}

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
