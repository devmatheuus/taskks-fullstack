import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const ContainerModal = styled.div`
    height: 100%;
    width: 100%;
    padding: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;

    background: rgba(0, 0, 0, 0.7);

    z-index: 1000;

    .modal {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 22px;
        width: 369px;
        padding: 10px;

        overflow-y: auto;

        background: var(--gray);

        box-shadow: 0px 4px 40px -10px var(--blue);
        border-radius: 4px;

        animation: ${appearFromRight} 1s;

        .header-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;

            width: 100%;

            h1 {
                font-weight: 700;
                font-size: 1.9rem;
            }

            button {
                background: transparent;

                width: 0%;
                padding: 5px 15px;
                svg {
                    color: var(--white-gray);

                    min-width: 25px;
                    align-self: flex-end;
                }
            }
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;

            width: 100%;
            gap: 1rem;

            input,
            button {
                width: 100%;
            }
        }
    }
`;
