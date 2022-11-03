import styled from 'styled-components';

export const ItemList = styled.li`
    display: flex;
    flex-direction: column;
    padding: 5px 10px;

    margin: 10px 0px;

    border-top: 1px solid var(--semi-gray);
    border-bottom: 1px solid var(--semi-gray);
    border-radius: 8px;

    .container-datas {
        width: 100%;
        justify-content: space-between;
        border-bottom: 1px solid black;
        display: flex;

        p {
            font-size: 1.4rem;
            font-weight: 500;

            padding: 5px;

            svg {
                margin-right: 6px;
                min-width: 20px;
                min-height: 20px;

                transform: translateY(5px);
            }
        }
    }

    .description {
        font-size: 1.5rem;
        font-weight: 500;

        padding: 15px 5px;

        max-height: 100px;
        overflow-y: auto;

        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--semi-gray);
            border-radius: 10px;
        }
    }

    @media (max-width: 380px) {
        .container-datas {
            display: flex;
            flex-direction: column;

            padding: 10px 0px;
        }
    }
`;
