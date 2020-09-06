import { connect } from "react-redux";

/* Component */
import Signup from "../components/Signup";

/* Action */
import {
    signupInputChange,
    setErrorMessagePassword,
    setErrorMessageEmail,
    togglePassword,
    signup,
} from "../store/actions/userActions";

const mapStateToProps = (state) => ({
    signupData: state.user.signupData,
    errorMessagePassword: state.user.errorMessagePassword,
    errorMessageEmail: state.user.errorMessageEmail,
    showPassword: state.user.showPassword,
    loading: state.user.loading,
    errorMailUsed: state.user.errorMailUsed,
});

const mapDispatchToProps = (dispatch) => ({
    onInputChange: (changedData) => {
        dispatch(signupInputChange(changedData));
    },
    setErrorMessagePassword: (errorMessage) => {
        dispatch(setErrorMessagePassword(errorMessage));
    },
    setErrorMessageEmail: (errorMessage) => {
        dispatch(setErrorMessageEmail(errorMessage));
    },
    togglePassword: () => {
        dispatch(togglePassword());
    },
    signup: () => {
        dispatch(signup());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
