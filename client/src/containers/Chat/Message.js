import { connect } from "react-redux";
import Message from "../../components/Chat/Message";
import { 
    socketEmitMessage, 
    socketEmitTyping, 
    socketSetRecipient,
    fetchAllMessages,
    setMessageInAllMessages,
    emptyAllMessages,
} from "../../store/actions/chatActions";

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    userSlugInfos: state.user.userSlugInfos,
    socketRecipient: state.chatReducer.socketRecipient,
    allMessages: state.chatReducer.allMessages,
    userTyping: state.chatReducer.userTyping,
});

const mapDispatchToProps = dispatch => ({
    socketEmitMessage: msgObj => {
        dispatch(socketEmitMessage(msgObj));
    },
    socketEmitTyping: typingObj => {
        dispatch(socketEmitTyping(typingObj));
    },
    socketSetRecipient: recipientObj => {
        dispatch(socketSetRecipient(recipientObj));
    },
    fetchAllMessages: () => {
        dispatch(fetchAllMessages());
    },
    setMessageInAllMessages: (messageObj) => {
        dispatch(setMessageInAllMessages(messageObj));
    },
    emptyAllMessages: () => {
        dispatch(emptyAllMessages());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
