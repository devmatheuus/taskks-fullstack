import styled from 'styled-components';

export const StyledAdminListContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 10px 35px;
    margin: 55px 0px;

    .container-buttons {
        display: flex;
        width: 100%;
        max-width: 600px;

        justify-content: space-between;
        flex-wrap: wrap;
        padding: 10px;

        button {
            padding: 10px;
        }
    }

    .container {
        background: var(--white);
        width: 100%;
        max-width: 600px;

        padding: 10px 5px;

        display: flex;
        flex-direction: column;

        border-radius: 8px;
        border: 1px solid black;

        .container-infos {
            display: flex;

            max-height: 350px;

            display: flex;
            flex-direction: column;

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
    }
`;
