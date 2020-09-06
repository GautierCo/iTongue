// FOLLOW

export const FOLLOW = "FOLLOW";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_ERROR = "FOLLOW_ERROR";

export const follow = (payload) => ({
    type: FOLLOW,
    payload,
});

export const followSuccess = (payload) => ({
    type: FOLLOW_SUCCESS,
    payload,
});

export const followError = (payload) => ({
    type: FOLLOW_ERROR,
    payload,
});

// UNFOLLOW
export const UNFOLLOW = "UNFOLLOW";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_ERROR = "UNFOLLOW_ERROR";

export const unFollow = (payload) => ({
    type: UNFOLLOW,
    payload,
});

export const unFollowSuccess = (payload) => ({
    type: UNFOLLOW_SUCCESS,
    payload,
});

export const unFollowError = (payload) => ({
    type: UNFOLLOW_ERROR,
    payload,
});

// CHECK_IF_USER_FOLLOW

export const CHECK_IF_USER_FOLLOW = "CHECK_IF_USER_FOLLOW";
export const CHECK_IF_USER_FOLLOW_SUCCESS = "CHECK_IF_USER_FOLLOW_SUCCESS";
export const CHECK_IF_USER_FOLLOW_ERROR = "CHECK_IF_USER_FOLLOW_ERROR";

export const checkIfUserFollow = (payload) => ({
    type: CHECK_IF_USER_FOLLOW,
    payload,
});

export const checkIfUserFollowSuccess = (payload) => ({
    type: CHECK_IF_USER_FOLLOW_SUCCESS,
    payload,
});

export const checkIfUserFollowError = (payload) => ({
    type: CHECK_IF_USER_FOLLOW_ERROR,
    payload,
});