
import { connect } from 'react-redux';
import { addLanguageSubmit, languageInputValue, fetchLanguages, deleteLanguageSubmit } from '../../store/actions/Admin/expressionsActions';
import Languages from '../../components/Admin/Languages';

const mapStateToProps = (state) => ({
    languageValue: state.expressionsReducer.languageValue,
    newLanguageLoading : state.expressionsReducer.newLanguageLoading,
    languagesList: state.expressionsReducer.languagesList,
});

const mapDispatchToProps = (dispatch) => ({
    languageInputValue: (inputValue) => {
        dispatch(languageInputValue(inputValue));
    },
    addLanguageSubmit: () => {
        dispatch(addLanguageSubmit());
    },
    fetchLanguages: () => {
        dispatch(fetchLanguages());
    },
    deleteLanguageSubmit: (langId) => {
        dispatch(deleteLanguageSubmit(langId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Languages);