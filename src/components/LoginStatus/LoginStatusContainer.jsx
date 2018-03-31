import React from 'react';
import { connect } from 'react-redux';
import LoginStatus from './LoginStatus';
import Status from './Status';
import StatusWithFetch from './StatusWithFetch';
import { getUserData } from '../../actions/userActions';

let LoginStatusContainer = (props) => {
  const { matchBetting, web3, web3Error } = props;

  let component;

  if (matchBetting && web3) {
    component = <StatusWithFetch {...props} />;
  } else if (web3Error && web3Error.toString().includes('network/artifact mismatch')) {
    component = <Status message="Status: Not connected to the Ethereum contract" />;
  } else if (web3Error) {
    component = <Status message="Status: No web3 detected" />;
  } else {
    component = <Status message="Status: Loading..." />;
  }

  return (
    <LoginStatus>
      {component}
    </LoginStatus>
  );
};

const mapStateToProps = state => ({
  web3: state.web3.web3Instance,
  web3Error: state.web3.web3Error,
  matchBetting: state.web3.matchBetting,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  getUserData: (web3, matchBetting) => dispatch(getUserData(web3, matchBetting)),
});

LoginStatusContainer = connect(mapStateToProps, mapDispatchToProps)(LoginStatusContainer);

export default LoginStatusContainer;
