import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: ${props => (props.style && props.style.width)};
  height: ${props => (props.style && props.style.height)};
  padding: ${props => (props.style && props.style.padding)};
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
`;

const Card = ({ style, children }) => (
  <StyledDiv style={style}>
    {children}
  </StyledDiv>
);

export default Card;

