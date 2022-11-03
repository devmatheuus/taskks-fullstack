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

        overflow-y: auto;

        background: var(--gray);

        box-shadow: 0px 4px 40px -10px var(--blue);
        border-radius: 4px;

        animation: ${appearFromRight} 1s;

        padding: 10px;

        .header-controls {
            h1 {
                font-weight: 700;
                font-size: 1.9rem;
            }
        }

        .container-info {
            gap: 5px;
            justify-content: space-around;

            display: flex;
            align-items: center;
            p {
                font-weight: 500;
                font-size: 1.5rem;
            }
            svg {
                min-width: 20px;
                min-height: 20px;

                align-self: flex-start;
            }
        }

        .container-buttons {
            display: flex;
            width: 100%;
            justify-content: space-around;
        }
    }
`;
