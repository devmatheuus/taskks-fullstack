import styled from 'styled-components';

export const GenericContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 1%;
    height: 100vh;
    max-width: 1400px;
    padding: 2% 5%;
    margin: 0 auto;

    p {
        font-size: 2.5rem;
        font-weight: 600;
        color: var(--dark-gray);
    }

    div {
        height: 60%;
        max-height: 400px;

        img {
            height: 100%;
            max-width: 100%;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 55%;
        max-width: 300px;
        min-width: 200px;
        height: 200px;
        gap: 5px;

        button {
            width: 100%;
        }
    }

    small {
        font-size: 1.1rem;
        color: var(--semi-black);
        text-align: center;
    }
`;
