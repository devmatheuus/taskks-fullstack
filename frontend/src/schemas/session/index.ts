import * as yup from 'yup';

export const formSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Este campo é obrigatório'),
    password: yup
        .string()
        .required('Este campo é obrigatório')
        .min(5, 'A senha deve conter pelo menos 5 caracteres')
});
