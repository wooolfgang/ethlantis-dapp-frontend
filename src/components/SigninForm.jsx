import React from 'react';
import styled from 'styled-components';
import { METAMASK } from '../assets/images';
import Button from './Button';

const StyledDiv = styled.div`
  height: calc(100vh - 64px);
`;

const SigninFormContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;

  @media screen and (min-width: 700px) {
    width: 400px;
    height: 500px;
    box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
    border-top: 5px solid #00a8ff;
    padding: 20px;
  }

  @media screen and (max-width: 700px) {
    width: 90%;
    height: auto;
  }
`;

const TitleContainer = styled.div`
  display: grid;
  text-align: center;
  height: 100px;

  @media screen and (min-width: 700px) {
    grid-template-areas: 'metamask titleText';
  }

  @media screen and (max-width: 700px) {
    height: 120px;
    grid-template-areas: 'metamask' 'titleText';
    grid-auto-rows: 70px 1fr;
  }
`;

const MetamaskLogo = styled.div`
  @media screen and (min-width: 700px) {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  grid-area: metamask;
  height: 70px;
  width: 70px;
  margin: 0 auto;
  background: url(${METAMASK}) center no-repeat;
  background-size: 100% 100%;
`;

const TitleTextContainer = styled.div`
  grid-area: titleText;
`;

const Title = styled.p`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  font-size: 1.5em;
`;

const FormContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px 5px;
  font-size: 0.9em;
  border: none;
`;

const TermsAndButtonContainer = styled.div`
  text-align: center;
  color: gray;
  font-size: 0.9em;
  font-weight: 300;
  margin-bottom: 10px;
`;

const SigninForm = () => (
  <StyledDiv>
    <SigninFormContainer>
      <TitleContainer>
        <MetamaskLogo />
        <TitleTextContainer>
          <Title>Signin with Metamask</Title>
        </TitleTextContainer>
      </TitleContainer>
      <hr />
      <FormContainer>
        <div>
          <p>Address</p>
          <StyledInput type="text" name="address" />
        </div>
        <div>
          <p>Email</p>
          <StyledInput type="email" name="email" />
        </div>
        <div>
          <p>Username</p>
          <StyledInput type="text" name="username" />
        </div>
        <br />
        <TermsAndButtonContainer>
          <input type="checkbox" name="agree" />
          <span>Agree to the terms & agreements</span>
        </TermsAndButtonContainer>
        <Button type="secondary">Signin</Button>
      </FormContainer>
    </SigninFormContainer>
  </StyledDiv>
);

export default SigninForm;
