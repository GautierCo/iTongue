
import { connect } from 'react-redux';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import { logout } from "../../store/actions/userActions";

const mapStateToProps = (state) => ({
    userConnect: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => {
        dispatch(logout());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);