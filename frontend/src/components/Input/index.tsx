import InputContainer from './style';
import { InputHTMLAttributes } from 'react';

interface IComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    register: any;
}

const Input = ({
    placeholder,
    label,
    register,
    name,
    ...rest
}: IComponentProps) => {
    return (
        <InputContainer>
            {label && <label>{label}</label>}
            <input placeholder={placeholder} {...register(name)} {...rest} />
        </InputContainer>
    );
};

export default Input;
