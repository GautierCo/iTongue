import { connect } from "react-redux";

/* Component */
import Modal from "../../components/Team/modal";

/* Action */
import { toggleModal, setPyroVisible } from "../../store/actions/settingsActions";

const mapStateToProps = (state) => ({
    myAvatar: state.team.myAvatar,
    // visible: state.team.visible,
});

const mapDispatchToProps = (dispatch) => ({
    setPyroVisible: (payload) => {
        dispatch(setPyroVisible(payload));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
