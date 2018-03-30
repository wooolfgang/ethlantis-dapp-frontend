import React from 'react';
import { connect } from 'react-redux';
import LoginStatus from './LoginStatus';
import { getUserData } from '../../actions/userActions';

let LoginStatusContainer = (props) => {
  const { web3, matchBetting } = props;

  if (!web3 || !matchBetting) {
    return null;
  }

  return (
    <LoginStatus
      {...props}
    />
  );
};

const mapStateToProps = state => ({
  web3: state.web3.web3Instance,
  matchBetting: state.web3.matchBetting,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUserData: (web3, matchBetting) => dispatch(getUserData(web3, matchBetting)),
});

LoginStatusContainer = connect(mapStateToProps, mapDispatchToProps)(LoginStatusContainer);

export default LoginStatusContainer;
