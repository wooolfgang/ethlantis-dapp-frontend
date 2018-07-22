import { injectGlobal } from 'styled-components';

const inject = () => injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,350,400|Roboto+Slab:100,300,350,400');

  body {
    margin: 0;
    padding: 0;
    color: #333;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    max-width: 100vw;
  }
`;

export default inject;
