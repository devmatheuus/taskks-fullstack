import styled from 'styled-components';

export const StyledNoContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 800px;
    padding: 0px 5px;
    margin: 10px 0px;

    gap: 10px;
    background: var(--white);

    border-radius: 8px;

    box-shadow: 0px 0px 15px 1px var(--dark-gray);

    div {
        width: 100%;
        max-width: 400px;

        p {
            font-size: 2rem;
            font-weight: 800;

            text-align: center;

            padding: 5px 0px;
            color: var(--semi-black);
        }

        img {
            width: 100%;
        }
    }
`;
