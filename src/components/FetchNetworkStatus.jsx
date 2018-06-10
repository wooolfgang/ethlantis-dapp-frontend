import React from 'react';

class FetchNetworkStatus extends React.Component {
  async componentDidMount() {
    const { getUserData } = this.props;
    await getUserData();
  }

  render() {
    return (
      <div />
    );
  }
}

export default FetchNetworkStatus;
