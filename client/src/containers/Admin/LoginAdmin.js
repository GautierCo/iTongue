
import { connect } from 'react-redux';
import LoginAdmin from '../../components/Admin/LoginAdmin';
import {
    loginInputChange,
    login,
} from "../../store/actions/loginActions";

const mapStateToProps = (state) => ({
    loginData: state.user.loginData,
    message: state.user.loginErrorMessage,
    loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
    loginSubmit: () => {
        dispatch(login());
    },
    loginInputValue: (objValue) => {
        dispatch(loginInputChange(objValue));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdmin);