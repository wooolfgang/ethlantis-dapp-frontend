import React from 'react';
import styled from 'styled-components';

const Primary = styled.button`
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  border: none;
  border-radius: 30px;
  background: none;
  padding: ${props => (props.padding ? props.padding : '12px 25px')};
  color: ${props => props.theme.colorPrimary};
  border: 1px solid ${props => props.theme.colorPrimary}; 
`;

const Secondary = Primary.extend`
  background: ${props => props.theme.colorPrimary};
  color: white;
`;

const Inverted = Primary.extend`
  color: white;
  background: none;
  border: 1px solid white;
`;

const Button = ({
  type, children, onClick, padding,
}) => {
  function render(Component) {
    return <Component onClick={onClick} padding={padding} > {children} </Component>;
  }

  function renderButton() {
    switch (type) {
      case 'primary':
        return render(Primary);
      case 'secondary':
        return render(Secondary);
      case 'inverted':
        return render(Inverted);
      default:
        return render(Primary);
    }
  }

  return (
    renderButton(children)
  );
};


export default Button;

