import { connect } from "react-redux";

/* Component */
import EditSlugForm from "../../../components/User/EditProfil/Forms/editSlugForm";

/* Actions */
import { editProfilSlug, editProfilSlugInput } from '../../../store/actions/editProfilActions';

const mapStateToProps = (state) => ({
    editProfilData: state.user.editProfilData,
    editProfilSlugMsg: state.user.editProfilSlugMsg,
});

const mapDispatchToProps = (dispatch) => ({
    editProfilSlug: () => {
        dispatch(editProfilSlug());
    },
    editProfilSlugInput: (inputSlugValue) => {
        dispatch(editProfilSlugInput(inputSlugValue));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSlugForm);