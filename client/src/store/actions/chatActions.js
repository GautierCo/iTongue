export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const SOCKET_EMIT_MESSAGE = "SOCKET_EMIT_MESSAGE";
export const SOCKET_EMIT_TYPING = "SOCKET_EMIT_TYPING";
export const SOCKET_SET_RECIPIENT = "SOCKET_SET_RECIPIENT";

export const socketConnect = () => ({
    type: SOCKET_CONNECT,
});

export const socketEmitMessage = (payload) => ({
    type: SOCKET_EMIT_MESSAGE,
    payload,
});

export const socketEmitTyping = (payload) => ({
    type: SOCKET_EMIT_TYPING,
    payload,
});

export const socketSetRecipient = (payload) => ({
    type: SOCKET_SET_RECIPIENT,
    payload,
});

export const FETCH_ALL_THREADS = "FETCH_ALL_THREADS";
export const FETCH_ALL_THREADS_SUCCESS = "FETCH_ALL_THREADS_SUCCESS";
export const FETCH_ALL_THREADS_ERROR = "FETCH_ALL_THREADS_ERROR";
export const EMPTY_ALL_THREADS = 'EMPTY_ALL_THREADS';
export const UPDATE_UNREAD_COUNT = "UPDATE_UNREAD_COUNT";

export const fetchAllThreads = () => ({
    type: FETCH_ALL_THREADS,
});

export const fetchAllThreadsSuccess = (payload) => ({
    type: FETCH_ALL_THREADS_SUCCESS,
    payload,
});

export const fetchAllThreadsError = (payload) => ({
    type: FETCH_ALL_THREADS_ERROR,
    payload,
});
export const emptyAllThreads = () => ({
    type: EMPTY_ALL_THREADS,
});

export const updateUnreadCount = (payload) => ({
    type: UPDATE_UNREAD_COUNT,
    payload,
});

export const UPDATE_ALL_THREADS_MESSAGES = "UPDATE_ALL_THREADS_MESSAGES";

export const updateAllThreadsMessages = (payload) => ({
    type: UPDATE_ALL_THREADS_MESSAGES,
    payload,
});

export const FETCH_ALL_MESSAGES = "FETCH_ALL_MESSAGES";
export const FETCH_ALL_MESSAGES_SUCCESS = "FETCH_ALL_MESSAGES_SUCCESS";
export const FETCH_ALL_MESSAGES_ERROR = "FETCH_ALL_MESSAGES_ERROR";
export const EMPTY_ALL_MESSAGES = "EMPTY_ALL_MESSAGES";

export const fetchAllMessages = () => ({
    type: FETCH_ALL_MESSAGES,
});

export const fetchAllMessagesSuccess = (payload) => ({
    type: FETCH_ALL_MESSAGES_SUCCESS,
    payload,
});

export const fetchAllMessagesError = (payload) => ({
    type: FETCH_ALL_MESSAGES_ERROR,
    payload,
});

export const emptyAllMessages = () => ({
    type: EMPTY_ALL_MESSAGES,
});

export const SET_MESSAGE_IN_ALL_MESSAGES = "SET_MESSAGE_IN_ALL_MESSAGES";

export const setMessageInAllMessages = (payload) => ({
    type: SET_MESSAGE_IN_ALL_MESSAGES,
    payload,
});

export const SET_USER_IS_TYPING = "SET_USER_IS_TYPING";

export const setUserIsTyping = (payload) => ({
    type: SET_USER_IS_TYPING,
    payload,
});