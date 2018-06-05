import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import NetworkStatus from './NetworkStatus';
import Status from './Status';

let NetworkStatusContainer = (props) => {
  const { web3Error, user } = props;

  let component;

  if (user.address && user.balance) {
    component = (
      <Fragment>
        <Status message="Status: Connected" />
        <Status message={`Balance: ${user.balance} `} />
      </Fragment >);
  } else if (web3Error && web3Error.toString().includes('network/artifact mismatch')) {
    component = <Status message="Status: Not connected to the Ethereum contract" />;
  } else if (web3Error) {
    component = <Status message="Status: No web3 detected" />;
  } else {
    component = <Status message="Status: Loading..." />;
  }

  return (
    <NetworkStatus>
      {component}
    </NetworkStatus>
  );
};

const mapStateToProps = state => ({
  web3Error: state.web3.web3Error,
  user: state.user,
});

NetworkStatusContainer = connect(mapStateToProps)(NetworkStatusContainer);

export default NetworkStatusContainer;
