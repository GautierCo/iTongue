import { connect } from "react-redux";
import EditProfil from "../../components/User/EditProfil";
import { editProfil, editProfilInput } from '../../store/actions/editProfilActions';

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    editProfilData: state.user.editProfilData,
    editProfilDataLoading: state.user.editProfilDataLoading,
});

const mapDispatchToProps = (dispatch) => ({
    editProfil: () => {
        dispatch(editProfil());
    },
    editProfilInput: (inputData) => {
        dispatch(editProfilInput(inputData));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfil);