import { connect } from "react-redux";

/* Component */
import Team from "../../components/Team";

/* Actions */
import {
    toggleModal,
    changeAvatar,
} from "../../store/actions/modalActions";

const mapStateToProps = (state) => ({
    visible: state.team.visible,
});

const mapDispatchToProps = (dispatch) => ({
    toggleModal: () => {
        dispatch(toggleModal());
    },
    changeAvatar: (newId) => {
        dispatch(changeAvatar(newId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);