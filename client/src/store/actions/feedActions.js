export const FETCH_FEED_USER = "FETCH_FEED_USER";
export const FETCH_FEED_USER_SUCCESS = "FETCH_FEED_USER_SUCCESS";
export const FETCH_FEED_USER_ERROR = "FETCH_FEED_USER_ERROR";

export const fetchFeedUser = () => ({
    type: FETCH_FEED_USER,
});
export const fetchFeedUserSuccess = (payload) => ({
    type: FETCH_FEED_USER_SUCCESS,
    payload,
});
export const fetchFeedUserError = () => ({
    type: FETCH_FEED_USER_ERROR,
});
