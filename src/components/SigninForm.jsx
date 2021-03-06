import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { METAMASK } from '../assets/images';
import Button from './Button';
import { signup } from '../actions/authActions';

const StyledDiv = styled.div`
  height: calc(100vh - 64px);
`;

const SigninFormContainer = styled.div`
  position: relative;
  top: 47.5%;
  transform: translateY(-50%);
  margin: 0 auto;

  @media screen and (min-width: 700px) {
    width: 450px;
    height: 500px;
    box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
    border-top: 5px solid #3EA5C2;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

   @media screen and (max-width: 700px) {
     align-items: center;
  }
`;

const MainHeader = styled.p`
  font-size: 1.5em;
  margin: 0;
  margin-bottom: 5px;
`;

const SubHeader = styled.p`
  margin: 0;
  color: #7f7f7f;
`;

const FormContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Label = styled.p`
  font-size: 1em;
  font-weight: 300;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px 5px;
  font-size: 0.9em;
  border: none;
  background: #F7F7F7;
  font-weight: 300;

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #b2b2b2;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #b2b2b2;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #b2b2b2;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #b2b2b2;
  }
`;

const TermsAndButtonContainer = styled.div`
  text-align: center;
  color: gray;
  font-size: 0.9em;
  font-weight: 300;
  margin-bottom: 10px;
`;


class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      username: null,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleSignup() {
    const { handleSignup } = this.props;
    const { email, username } = this.state;
    handleSignup(email, username);
  }

  render() {
    const { email, username } = this.state;
    const { publicAddress } = this.props;

    return (
      <StyledDiv>
        <SigninFormContainer>
          <TitleContainer>
            <MetamaskLogo />
            <TitleTextContainer>
              <MainHeader>Let's get started.</MainHeader>
              <SubHeader>Continue by signing in with metamask</SubHeader>
            </TitleTextContainer>
          </TitleContainer>
          <FormContainer>
            <div>
              <Label>Address</Label>
              <StyledInput
                type="text"
                name="address"
                value={publicAddress || undefined}
                disabled
              />
            </div>
            <div>
              <Label>Email</Label>
              <StyledInput
                type="email"
                name="email"
                placeholder="alice@gmail.com"
                onChange={this.handleEmailChange}
                value={email}
              />
            </div>
            <div>
              <Label>Username</Label>
              <StyledInput
                type="text"
                name="username"
                placeholder="AliceX"
                onChange={this.handleUsernameChange}
                value={username}
              />
            </div>
            <br />
            <TermsAndButtonContainer>
              <input type="checkbox" name="agree" />
              <span>Agree to the terms & agreements</span>
            </TermsAndButtonContainer>
            <Button type="secondary" onClick={this.handleSignup}>Signin</Button>
          </FormContainer>
        </SigninFormContainer>
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => ({
  publicAddress: state.user.address,
});

const mapDispatchToProps = dispatch => ({
  handleSignup: (email, username) => dispatch(signup(email, username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
