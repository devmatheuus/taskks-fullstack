import styled from 'styled-components';

export const GenericContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100vh;
    max-width: 1400px;
    padding: 2px 6px;
    margin: 0 auto;

    p {
        transform: translateY(20px);

        font-size: 2.5rem;
        font-weight: 600;
        text-align: center;

        color: var(--dark-gray);
    }

    .container-image {
        height: 50%;
        max-height: 350px;

        display: flex;
        align-items: flex-end;
        justify-content: center;

        img {
            height: 90%;
            max-width: 100%;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 300px;
        height: 200px;
        gap: 5px;

        button {
            width: 100%;
        }
    }

    small {
        font-size: 1.3rem;
        text-align: center;

        max-width: 70%;

        color: var(--semi-black);
    }
`;
