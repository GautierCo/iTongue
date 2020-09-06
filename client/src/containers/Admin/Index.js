
import { connect } from 'react-redux';
import Index from '../../components/Admin/index';

const mapStateToProps = (state) => ({
    isLogged: state.user.isLogged,
    userConnect: state.user.currentUser,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Index);