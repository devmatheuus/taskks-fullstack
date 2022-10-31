import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    
    :root{
        --gray:  #EFEFEF;
        --blue: #578AF5;
        --semi-gray: #B8B8B8;
        --white: #FFFFFF;
        --dark-gray: #333;
        --semi-black: #7D7D7D;
        --red: #F00000;
        
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html{
        font-size: 62.5%;
    }

    body{
        background: var(--gray);
        
        font-size: 1.4rem;
        font-family: 'Inter';
    }

    button {
        cursor: pointer;
    }

    input {
        outline: none
    }

    ol, li {
        list-style-type: none;
    }

    a{
        text-decoration: none;
        color: var(--white)
    }
`;
