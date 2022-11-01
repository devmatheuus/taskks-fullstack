import styled from 'styled-components';

export const StyledTaskContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    padding: 10px 15px;
    gap: 2rem;

    border: 1px solid var(--gray);

    .container {
        margin-top: 50px;

        background: var(--white);

        width: 100%;
        max-width: 800px;

        border-radius: 8px;
        box-shadow: 0px 0px 15px 1px var(--dark-gray);

        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: 900;

            padding: 25px;
        }

        ul {
            width: 100%;
            max-height: 350px;

            display: flex;
            flex-direction: column;

            overflow-y: auto;
            box-shadow: 0px 0px 15px 1px var(--semi-gray);

            ::-webkit-scrollbar {
                width: 5px;
                height: 5px;
            }

            ::-webkit-scrollbar-thumb {
                background: var(--semi-gray);
                border-radius: 10px;
            }
        }

        .add-task-container {
            background: var(--blue);
            color: var(--white);

            width: 100%;
            padding: 20px;

            border-top: 1px solid var(--semi-gray);
            border-radius: 0px 0px 8px 8px;

            p {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 2rem;
                font-weight: 400;
            }
        }
    }
`;
