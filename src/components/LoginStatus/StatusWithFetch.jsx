import React, { Fragment } from 'react';
import Status from './Status';

class StatusContainer extends React.Component {
  async componentDidMount() {
    const { web3, matchBetting, getUserData } = this.props;
    await getUserData(web3, matchBetting);
  }

  render() {
    const { user } = this.props;
    const status = user.id ? 'Conected' : 'Loading';
    const balance = user.balance ? user.balance : 0;

    return (
      <Fragment>
        <Status message={`Status: ${status}`} />
        <Status message={`Balance: ${balance} `} />
      </Fragment >
    );
  }
}

export default StatusContainer;
