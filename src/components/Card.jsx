import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: ${props => (props.width ? props.width : 'inherit')};
  height: ${props => (props.height ? props.height : 'inherit')};
  padding: ${props => (props.padding ? props.padding : '0px')};
  box-shadow: 0 10px 30px rgba(51, 51, 51, .1);
  display: ${props => props.display && props.display};
  flex-direction: ${props => props.flexDirection && props.flexDirection};
  justify-content: ${props => props.justifyContent && props.justifyContent};
  align-items: ${props => props.alignItems && props.alignItems};
`;

const Card = (props) => {
  const {
    width, height, padding, children, flexDirection,
    display, justifyContent, alignItems,
  } = props;

  return (
    <StyledDiv
      width={width}
      height={height}
      padding={padding}
      flexDirection={flexDirection}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </StyledDiv>
  );
};

export default Card;

