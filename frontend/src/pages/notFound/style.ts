import styled from 'styled-components';

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100vh;
    padding: 5px;
    gap: 15px;

    .container-image {
        width: 100%;
        max-width: 450px;

        img {
            width: 100%;
        }
    }

    p {
        transform: translateY(-60px);

        text-align: center;
        font-size: 2rem;
        font-weight: bolder;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

        color: var(--semi-black);
    }

    button {
        transform: translateY(-40px);
    }
`;
