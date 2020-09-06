import { connect } from "react-redux";

import AudioPlayerRecording from "../components/Layout/recording/audioPlayerRecording";

import { setIrecordSelectedId } from "../store/actions/irecordsActions";

const mapStateToProps = (state) => ({
    irecordSelectedId: state.irecords.irecordSelectedId,
});

const mapDispatchToProps = (dispatch) => ({
    setIrecordSelectedId: (id) => {
        dispatch(setIrecordSelectedId(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayerRecording);
