import styled from 'styled-components';

export const Container = styled.header`
    padding: 40px 15px;
    display: flex;
    justify-content: center;

    div {
        width: 100%;
        max-width: 1100px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        h3 {
            font-size: 3rem;
            font-weight: 600;
        }

        button {
            padding: 10px 15px;
        }
    }
`;
