export const FETCH_IFOLLOWERS = "FETCH_IFOLLOWERS";
export const FETCH_IFOLLOWERS_SUCCESS = "FETCH_IFOLLOWERS_SUCCESS";
export const FETCH_IFOLLOWERS_ERROR = "FETCH_IFOLLOWERS_ERROR";

export const fetchIfollowers = () => ({
    type: FETCH_IFOLLOWERS,
});
export const fetchIfollowersSuccess = (payload) => ({
    type: FETCH_IFOLLOWERS_SUCCESS,
    payload,
});
export const fetchIfollowersError = () => ({
    type: FETCH_IFOLLOWERS_ERROR,
});

export const FETCH_IFOLLOWING = "FETCH_IFOLLOWING";
export const FETCH_IFOLLOWING_SUCCESS = "FETCH_IFOLLOWING_SUCCESS";
export const FETCH_IFOLLOWING_ERROR = "FETCH_IFOLLOWING_ERROR";

export const fetchIfollowing = () => ({
    type: FETCH_IFOLLOWING,
});
export const fetchIfollowingSuccess = (payload) => ({
    type: FETCH_IFOLLOWING_SUCCESS,
    payload,
});
export const fetchIfollowingError = () => ({
    type: FETCH_IFOLLOWING_ERROR,
});

export const SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS = "SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS"

export const setSelectedUserToFetchSubscriptions = (payload) => ({
    type: SET_SELECTED_USER_TO_FETCH_SUBSCRIPTIONS,
    payload
})

