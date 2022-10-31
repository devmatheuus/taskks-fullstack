import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 1%;
    height: 100vh;
    max-width: 1400px;
    padding: 0 2%;

    margin: 0 auto;

    div:first-child {
        max-width: 400px;

        p {
            font-size: 2rem;
            font-weight: 500;
            color: var(--semi-black);
        }
    }

    div:nth-child(2) {
        height: 50%;

        img {
            height: 100%;
            max-width: 100%;

            object-fit: cover;
        }
    }

    .message {
        color: var(--semi-black);
        max-width: 250px;
        font-weight: 500;
        font-size: 1.5rem;
        text-align: center;
    }

    button {
        min-width: 210px;
    }
`;
