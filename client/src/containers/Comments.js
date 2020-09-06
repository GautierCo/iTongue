import { connect } from "react-redux";
import Comments from "../components/Irecords/Comments";
import { 
    commentInput, 
    commentSubmit, 
    deleteComment, 
    updateComment, 
    fetchCommentsByRecord, 
    setRecordIdComment,
    updateCommentInput,
} from '../store/actions/commentActions';

const mapStateToProps = (state) => ({
    commentInputValue: state.irecords.commentInputValue,
    commentSubmitLoading: state.irecords.commentSubmitLoading,
    commentsList: state.irecords.commentsList,
    iRecordCommentIdSelect: state.irecords.iRecordCommentIdSelect,
    commentEditInputValue: state.irecords.commentEditInputValue,
    isLogged: state.user.isLogged,
    currentUser: state.user.currentUser,
    fetchCommentLoading: state.irecords.fetchCommentLoading,
});

const mapDispatchToProps = (dispatch) => ({
    commentInput: (inputValue) => {
        dispatch(commentInput(inputValue));
    },
    commentSubmit: (recordId) => {
        dispatch(commentSubmit(recordId));
    },
    deleteComment: (objComIdRecordId) => {
        dispatch(deleteComment(objComIdRecordId));
    },
    updateComment: (commentId) => {
        dispatch(updateComment(commentId));
    },
    fetchCommentsByRecord: (recordId) => {
        dispatch(fetchCommentsByRecord(recordId));
    },
    setRecordIdComment: (recordIdSelect) => {
        dispatch(setRecordIdComment(recordIdSelect));
    },
    updateCommentInput: (commentInputValue) => {
        dispatch(updateCommentInput(commentInputValue));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);