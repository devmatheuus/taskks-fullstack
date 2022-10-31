import styled from 'styled-components';

const Button = styled.button`
    border: none;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: 1s;

    font-size: 1.2rem;
    font-weight: 600;

    padding: 15px 30px;

    background: var(--blue);
    color: var(--white);

    &:hover {
        filter: brightness(1.5);
    }
`;

export default Button;
