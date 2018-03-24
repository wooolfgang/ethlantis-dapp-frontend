import { injectGlobal } from 'styled-components';

const inject = () => injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto|Roboto+Slab');

  body {
    margin: 0;
    padding: 0;
    color: #333;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    width: 100vw;
  }
`;

export default inject;
