import { connect } from 'react-redux';
import Header from './Header';
import loginUser from '../../actions/userActions';

const mapStateToProps = state => ({
  web3: state.web3.web3Instance,
  matchBetting: state.web3.matchBetting,
});

const mapDispatchToProps = dispatch => ({
  loginUserFunc: (userId, isOwner) => dispatch(loginUser(userId, isOwner)),
});

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
