import styled from 'styled-components';

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 5px;

    label {
        color: var(--dark-gray);
        font-size: 1.1rem;
    }

    input {
        border-radius: 5px;
        padding: 10px 10px;

        border: 1px solid var(--semi-black);

        ::placeholder {
            color: var(--semi-black);
        }
    }
`;

export default InputContainer;
