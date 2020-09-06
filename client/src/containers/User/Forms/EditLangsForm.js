import { connect } from "react-redux";

/* Component */
import EditLangsForm from "../../../components/User/EditProfil/Forms/editLangsForm";

/* Actions */
import { fetchAllLanguages } from '../../../store/actions/languagesAction';

const mapStateToProps = (state) => ({
    allLanguagesList: state.languagesReducer.allLanguagesList,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllLanguages: () => {
        dispatch(fetchAllLanguages());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLangsForm);