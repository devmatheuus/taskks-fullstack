import * as yup from 'yup';
import { dateValidation } from '../../utils/dateRegexValidation';

export const createTaskSchema = yup.object().shape({
    description: yup
        .string()
        .required('Este campo é obrigatório')
        .min(5, 'Este campo deve ter pelo menos 5 caracteres'),
    deadline: yup
        .string()
        .required('Este campo é obrigatório')
        .matches(dateValidation, 'Insira um data válida')
});

export const updateTaskSchema = yup.object().shape({
    description: yup.string(),
    deadline: yup.string()
});

export const finishTaskSchema = yup.object().shape({
    is_finished: yup.boolean().required()
});
