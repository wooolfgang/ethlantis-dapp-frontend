import React from 'react';
import { connect } from 'react-redux';
import AdminPage from './AdminPage';
import loginUser from '../../actions/userActions';

let AdminPageContainer = props => (
  <div>
    {
      (props.web3 && props.matchBetting) &&
      <AdminPage
        web3={props.web3}
        matchBetting={props.matchBetting}
        loginUser={props.loginUserFunc}
        user={props.user}
      />
    }
  </div>
);

const mapStateToProps = state => ({
  web3: state.web3.web3Instance,
  matchBetting: state.web3.matchBetting,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginUserFunc: (userId, isOwner) => dispatch(loginUser(userId, isOwner)),
});

AdminPageContainer = connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer);

export default AdminPageContainer;
