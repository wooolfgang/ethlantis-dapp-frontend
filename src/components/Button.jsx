import React from 'react';
import styled from 'styled-components';

const Primary = styled.button`
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 300;
  border: none;
  border-radius: 30px;
  background: none;
  padding: ${props => (props.padding ? props.padding : '12px 25px')};
  color: ${props => props.theme.colorSecondary};
  border: 1px solid ${props => props.theme.colorSecondary}; 

  :disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const Secondary = Primary.extend`
  background: ${props => props.theme.colorSecondary};
  color: white;
`;

const Inverted = Primary.extend`
  color: white;
  background: none;
  border: 1px solid white;
`;

const Glow = Primary.extend`
  color: white;
  border: none;
  box-shadow:  0px 0px 40px ${props => props.theme.colorTertiary};
  background-color: ${props => props.theme.colorTertiary}; 
  -webkit-box-shadow: 0 0 40px ${props => props.theme.colorTertiary}; 
`;

const Button = ({
  type, children, onClick, padding, disabled,
}) => {
  function render(Component) {
    return (
      <Component
        onClick={onClick}
        padding={padding}
        disabled={disabled}
      >
        {children}
      </Component>
    );
  }

  function renderButton() {
    switch (type) {
      case 'primary':
        return render(Primary);
      case 'secondary':
        return render(Secondary);
      case 'inverted':
        return render(Inverted);
      case 'glow':
        return render(Glow);
      default:
        return render(Primary);
    }
  }

  return (
    renderButton(children)
  );
};


export default Button;

