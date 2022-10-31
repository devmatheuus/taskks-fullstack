import InputContainer from './style';
import { InputHTMLAttributes } from 'react';

interface IComponentProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = ({ placeholder, label, ...rest }: IComponentProps) => {
    return (
        <InputContainer>
            {label && <label>{label}</label>}
            <input placeholder={placeholder} {...rest} />
        </InputContainer>
    );
};

export default Input;
