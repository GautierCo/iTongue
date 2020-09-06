import { connect } from "react-redux";

/* Component */
import Layout from "../components/Layout";

/* Actions */
import { toggleMenu } from "../store/actions/settingsActions";
import { logout } from "../store/actions/userActions";
import {
    toggleRecording,
    sendIrecordsRecorded,
    selectIrecordToRecord,
    setTranslationId,
    fetchAllExpressions,
} from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    visible: state.settings.visible,
    user: state.user.currentUser,
    recording: state.irecords.recording,
    isRecording: state.irecords.isRecording,
    loading: state.irecords.loading,
    isLogged: state.user.isLogged,
    allExpressions: state.irecords.allExpressions,
    traductionId: state.irecords.languageId,
    learnedLanguages: state.user.currentUser.learnedLanguages,
    taughtLanguages: state.user.currentUser.taughtLanguages,
    unreadCount: state.chatReducer.unreadCount,
});

const mapDispatchToProps = (dispatch) => ({
    setVisible: () => {
        dispatch(toggleMenu());
    },
    logout: () => {
        dispatch(logout());
    },
    toggleRecording: (value) => {
        dispatch(toggleRecording(value));
    },
    sendIrecordsRecorded: (blob) => {
        dispatch(sendIrecordsRecorded(blob));
    },
    selectIrecordToRecord: (irecord) => {
        dispatch(selectIrecordToRecord(irecord));
    },
    setTranslationId: (id) => {
        dispatch(setTranslationId(id));
    },
    fetchAllExpressions: () => {
        dispatch(fetchAllExpressions());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
