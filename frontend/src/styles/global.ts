import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        font-size: 62.5%;
    }

    body{
        background: #EFEFEF;
        font-size: 1.4rem;
        color: '#333';
        font-family: sans-serif
    }
`;
