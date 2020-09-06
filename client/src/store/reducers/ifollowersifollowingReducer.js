import {
    FETCH_IFOLLOWERS,
    FETCH_IFOLLOWERS_SUCCESS,
    FETCH_IFOLLOWERS_ERROR,
    FETCH_IFOLLOWING,
    FETCH_IFOLLOWING_SUCCESS,
    FETCH_IFOLLOWING_ERROR,
    SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS
} from "../actions/ifollowersifollowingActions";

const initialState = {
    selectedUserIdToFetchSubscriptions: {},
    allFollowers: [],
    isLoadingAllFollowers: false,
    allFollowing: [],
    isLoadingAllFollowing: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_IFOLLOWERS:
            return {
                ...state,
                isLoadingAllFollowers: true,
            };
        case FETCH_IFOLLOWERS_SUCCESS:
            return {
                ...state,
                allFollowers: [...action.payload],
                isLoadingAllFollowers: false,
            };
        case FETCH_IFOLLOWERS_ERROR:
            return {
                ...state,
                isLoadingAllFollowers: false,
                allFollowers: [],
            };
        case FETCH_IFOLLOWING:
            return {
                ...state,
                isLoadingAllFollowing: true,
                allFollowing: [],
            };
        case FETCH_IFOLLOWING_SUCCESS:
            return {
                ...state,
                isLoadingAllFollowing: false,
                allFollowing: [...action.payload],
            };
        case FETCH_IFOLLOWING_ERROR:
            return {
                ...state,
                isLoadingAllFollowing: false,
                allFollowing: [],
            };
        case SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS:
            return {
                ...state,
                selectedUserIdToFetchSubscriptions: {...action.payload}
            };
        default:
            return state;
    }
};
