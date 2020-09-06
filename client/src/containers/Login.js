import { connect } from "react-redux";

/* Component */
import Login from "../components/Login";

/* Action */
import {
    loginInputChange,
    loginSubmitSuccess,
    loginSubmitError,
    login,
    togglePassword,
} from "../store/actions/loginActions";

const mapStateToProps = (state) => ({
    loginData: state.user.loginData,
    loginErrorMessage: state.user.loginErrorMessage,
    loading: state.user.loading,
    showPassword: state.user.showPassword,
});

const mapDispatchToProps = (dispatch) => ({
    onInputChange: (changedData) => {
        dispatch(loginInputChange(changedData));
    },
    loginSubmitError: (errorMessage) => {
        dispatch(loginSubmitError(errorMessage));
    },
    loginSubmitSuccess: (successMessage) => {
        dispatch(loginSubmitSuccess(successMessage));
    },
    togglePassword: () => {
        dispatch(togglePassword());
    },
    login: () => {
        dispatch(login());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
