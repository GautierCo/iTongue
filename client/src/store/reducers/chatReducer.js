import {
    SOCKET_SET_RECIPIENT,
    FETCH_ALL_THREADS,
    FETCH_ALL_THREADS_SUCCESS,
    FETCH_ALL_THREADS_ERROR,
    FETCH_ALL_MESSAGES,
    FETCH_ALL_MESSAGES_SUCCESS,
    FETCH_ALL_MESSAGES_ERROR,
    SET_MESSAGE_IN_ALL_MESSAGES,
    SET_USER_IS_TYPING,
    EMPTY_ALL_THREADS,
    EMPTY_ALL_MESSAGES,
    UPDATE_UNREAD_COUNT,
    UPDATE_ALL_THREADS_MESSAGES,
} from "../actions/chatActions";

const initialState = {
    socketRecipient: {},
    allThreads: [],
    allMessages: {
        messages: []
    },
    userTyping: {},
    unreadCount: 0,
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        case SOCKET_SET_RECIPIENT: 
            return {
                ...state,
                socketRecipient: action.payload,
            };
        case FETCH_ALL_THREADS: 
            return {
                ...state,
            };
        case FETCH_ALL_THREADS_SUCCESS: 
            return {
                ...state,
                allThreads: [...action.payload],
            };
        case FETCH_ALL_THREADS_ERROR: 
            return {
                ...state,
                allThreads: [],
            };
        case FETCH_ALL_MESSAGES: 
            return {
                ...state,
            };
        case FETCH_ALL_MESSAGES_SUCCESS: 
            return {
                ...state,
                allMessages: {...action.payload},
            };
        case FETCH_ALL_MESSAGES_ERROR: 
            return {
                ...state,
                allMessages: {
                    messages: []
                },
            };
        case SET_MESSAGE_IN_ALL_MESSAGES: 
            return {
                ...state,
                allMessages: {
                    ...state.allMessages,
                    messages: [
                        ...state.allMessages.messages,
                        {...action.payload}
                    ]
                },
            }; 
        case EMPTY_ALL_THREADS: {
             return {
                 ...state,
                 allThreads: [],
             }
        }

        case EMPTY_ALL_MESSAGES : {
            return {
                ...state,
                allMessages: {
                    messages: []
                },
            };
        };
        case SET_USER_IS_TYPING:
            return {
                ...state,
                userTyping: {...action.payload}
            }
        case UPDATE_UNREAD_COUNT:
            return {
                ...state,
                unreadCount: action.payload,
            };
        case UPDATE_ALL_THREADS_MESSAGES:
            return {
                ...state,
                allThreads: [...action.payload]
            };

        default:
            return state;
    };
};