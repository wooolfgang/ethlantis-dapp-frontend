import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 1px;   
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  :hover {
    opacity: 1;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%; 
    background: ${props => props.theme.colorSecondary};
    cursor: pointer;

    :focus {
      background: gray;
    }
  }

  ::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${props => props.theme.colorSecondary};
    cursor: pointer;
}
`;

const Label = styled.span`
  font-weight: 300;
  color: #aaaaaa;
`;

const Slider = ({
  max, min, handleChange, defaultValue,
}) => {
  const defaultMax = max || 100;
  const defaultMin = min || 0;

  return (
    <StyledDiv>
      <Label> {defaultMin} </Label>
      <StyledInput
        type="range"
        max={defaultMax}
        min={defaultMin}
        onChange={handleChange}
        defaultValue={defaultValue}
      />
      <Label> {defaultMax} </Label>
    </StyledDiv>
  );
};

export default Slider;
