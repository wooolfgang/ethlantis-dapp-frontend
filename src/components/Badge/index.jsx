import { connect } from 'react-redux';
import Badge from './Badge';

const mapStateToProps = state => ({
  userId: state.user.id,
});

const BadgeContainer = connect(mapStateToProps)(Badge);

export default BadgeContainer;

