import InputContainer from '../Input/style';
import { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

interface IComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    register: any;
}

const InputDate = ({
    placeholder,
    label,
    register,
    name,
    ...rest
}: IComponentProps) => {
    return (
        <InputContainer>
            {label && <label>{label}</label>}
            <InputMask
                mask="99/99/9999"
                placeholder={placeholder}
                {...register(name)}
                {...rest}
            />
        </InputContainer>
    );
};

export default InputDate;
