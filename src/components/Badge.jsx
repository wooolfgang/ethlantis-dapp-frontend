import { connect } from 'react-redux';
import Badge from './badge/Badge';

const mapStateToProps = state => ({
  address: state.user.address,
});

const BadgeContainer = connect(mapStateToProps)(Badge);

export default BadgeContainer;

