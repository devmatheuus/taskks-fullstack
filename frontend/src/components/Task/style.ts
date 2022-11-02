import styled from 'styled-components';

export const StyledTask = styled.li`
    display: flex;
    border-top: 1px solid var(--semi-gray);
    border-bottom: 1px solid var(--semi-gray);

    margin: 1px 0px;

    .flag {
        display: none;
    }

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
            color: var(--blue);
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

    @media (max-width: 500px) {
        flex-direction: column;
        align-items: flex-end;

        margin: 5px;
        border: 1px solid var(--semi-gray);
        border-radius: 8px;

        max-height: 250px;
        width: 82%;
        align-self: center;

        .flag {
            display: flex;
            padding: 25px;
            background: var(--blue);
            border-radius: 8px 8px 0px 0px;
            width: 100%;
        }

        .container-button {
            order: 4;
            transform: translateY(-90px);
        }

        .container-task {
            min-height: 80px;

            p {
                min-height: 60px;
            }
        }

        .container-infos {
            order: 1;

            align-self: flex-start;

            justify-content: space-between;
            width: 40%;

            transform: translateY(20px);
            z-index: 0;

            span {
                margin: 15px 0px;
                font-size: 1.6rem;
                color: var(--semi-black);
                svg {
                    color: var(--blue);
                    min-height: 10px;
                    min-width: 20px;
                }
            }
        }

        .container-edit {
            order: 3;

            transform: translateY(-80px);
        }
    }
`;
