import * as yup from 'yup';
import { dateValidation } from '../../utils/dateRegexValidation';

export const createTaskSchema = yup.object().shape({
    description: yup.string().required('Este campo é obrigatório'),
    deadline: yup
        .string()
        .required('Este campo é obrigatório')
        .matches(
            dateValidation,
            'O prazo deve seguir o seguinte formato: dd/MM/yyyy'
        )
});
