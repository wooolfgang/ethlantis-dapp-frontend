import React from 'react';
import { connect } from 'react-redux';
import AdminPage from './admin/Admin';
import loginUser from '../actions/userActions';

let AdminPageContainer = props =>
  (
    <div>
      {
        (props.web3 && props.contract) &&
        (<AdminPage
          web3={props.web3}
          contract={props.contract}
          loginUser={props.loginUserFunc}
          user={props.user}
        />)
      }
    </div>
  );

const mapStateToProps = state => ({
  web3: state.web3.web3,
  contract: state.web3.contract,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginUserFunc: (address, isOwner) => dispatch(loginUser(address, isOwner)),
});

AdminPageContainer = connect(mapStateToProps, mapDispatchToProps)(AdminPageContainer);

export default AdminPageContainer;
