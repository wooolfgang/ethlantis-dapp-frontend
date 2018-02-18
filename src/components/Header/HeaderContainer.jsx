import { connect } from 'react-redux';
import Header from './Header';

const mapStateToProps = state => ({ web3: state.web3.web3Instance });

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
