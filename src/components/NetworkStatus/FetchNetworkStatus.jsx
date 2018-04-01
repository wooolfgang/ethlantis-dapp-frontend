import React from 'react';

class FetchNetworkStatus extends React.Component {
  async componentDidMount() {
    const { web3, matchBetting, getUserData } = this.props;
    await getUserData(web3, matchBetting);
  }

  render() {
    return (
      <div />
    );
  }
}

export default FetchNetworkStatus;
