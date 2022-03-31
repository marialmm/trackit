import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* Reset Css */

    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* Global Styles */
    :root{
    --dark-blue: #126BA5;
    --light-blue: #52B6FF;
    --gray: #666666;
    }

    *{
        box-sizing: border-box;
        font-family: 'Lexend Deca', sans-serif;
    }

    body{
        width: 100vw;
        height: 100vh;
        background-color: #F2F2F2;
    }

    .root{
        width: 100%;
        height: 100%;
    }

    input {
        margin-bottom: 6px;
        padding: 10px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        color: var(--gray);
    }

    input::placeholder {
        color: #DBDBDB;
        font-size: 20px;
    }

    input:disabled {
        background-color: #F2F2F2;
        color: #AFAFAF;
    }

    input:focus{
        border-color: #d5d5d5;
    }

    button:disabled{
        opacity: 0.7;
    }

    main{
        margin: 70px 0;
        padding: 28px 17px;
    }

    h1{
        font-size: 23px;
        line-height: 29px;
        color: var(--dark-blue);
    }

p{
  color: var(--gray);
  font-size: 18px;
  line-height: 22px;
}
`;

export default GlobalStyle;
