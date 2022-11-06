import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 2px;

    label {
        color: var(--dark-gray);
        font-size: 1.1rem;
    }

    input {
        border-radius: 5px;
        border: 1px solid var(--semi-black);

        padding: 10px 10px;

        color: var(--semi-black);

        ::placeholder {
            color: var(--semi-black);
        }
    }
`;

export default InputContainer;
