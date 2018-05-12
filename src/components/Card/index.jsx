import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: ${props => (props.width ? props.width : 'inherit')};
  height: ${props => (props.height ? props.height : 'inherit')};
  padding: ${props => (props.padding ? props.padding : '0px')};
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
`;

const Card = (props) => {
  const {
    width, height, padding, children,
  } = props;

  return (
    <StyledDiv
      width={width}
      height={height}
      padding={padding}
    >
      {children}
    </StyledDiv>
  );
};

export default Card;
