import { injectGlobal } from 'styled-components';

const inject = () => injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  body {
    margin: 0;
    padding: 0;
    color: #333;
    font-family: 'Roboto', sans-serif;
    width: 100vw;
  }
`;

export default inject;
