import styled from 'styled-components';

export const StyledTask = styled.li`
    display: flex;
    border-top: 1px solid var(--semi-gray);
    border-bottom: 1px solid var(--semi-gray);

    margin: 1px 0px;
    .container-button {
        border-right: 1px solid var(--semi-gray);
        button {
            background: transparent;
        }
    }

    .container-task {
        padding: 0px 10px;
        display: flex;
        align-items: center;

        width: 100%;
        max-width: 400px;
        overflow-y: auto;

        min-width: 150px;

        p {
            color: var(--semi-gray);
            font-weight: 600;
            font-family: Verdana, Geneva, Tahoma, sans-serif;

            max-height: 35px;
        }

        ::-webkit-scrollbar {
            width: 2px;
            height: 2px;
        }

        ::-webkit-scrollbar-thumb {
            background: var(--semi-gray);
            border-radius: 10px;
        }
    }

    .container-infos {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 30%;

        margin-left: 2%;
        span {
            font-size: 1.3rem;

            display: flex;
            align-items: center;

            gap: 5px;

            color: var(--semi-black);
            svg {
                color: var(--blue);
            }
        }
    }

    .container-edit {
        button {
            height: 100%;
            background: transparent;
        }
    }
`;
