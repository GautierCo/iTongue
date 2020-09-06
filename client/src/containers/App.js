import { connect } from "react-redux";

import App from "../components/App";
import { setCaptchaToken } from "../store/actions/settingsActions";
import { socketConnect } from "../store/actions/chatActions";

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    isLogged: state.user.isLogged,
    pyroVisible: state.settings.pyroVisible,
});

const mapDispatchToProps = (dispatch) => ({
    setCaptchaToken: (token) => {
        dispatch(setCaptchaToken(token));
    },
    socketConnect: () => {
        dispatch(socketConnect());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
