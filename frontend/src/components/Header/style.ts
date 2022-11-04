import styled from 'styled-components';

export const ContainerHeader = styled.header`
    display: flex;
    justify-content: center;

    padding: 10px 15px;

    background: var(--white);

    box-shadow: 0px 0px 10px 0px var(--dark-gray);

    div {
        width: 100%;
        max-width: 800px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        h1 {
            font-size: 3.5rem;
        }

        button {
            padding: 10px 25px;
        }
    }
`;
