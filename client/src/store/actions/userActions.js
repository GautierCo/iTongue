export const SIGNUP_INPUT_CHANGE = "SIGNUP_INPUT_CHANGE";
export const SET_ERROR_MESSAGE_PASSWORD = "SET_ERROR_MESSAGE_PASSWORD";
export const SET_ERROR_MESSAGE_MAIL = "SET_ERROR_MESSAGE_MAIL";
export const SHOW_PASSWORD = "SHOW_PASSWORD";
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signupInputChange = (payload) => ({
    type: SIGNUP_INPUT_CHANGE,
    payload,
});

export const setErrorMessagePassword = (payload) => ({
    type: SET_ERROR_MESSAGE_PASSWORD,
    payload,
});
export const setErrorMessageEmail = (payload) => ({
    type: SET_ERROR_MESSAGE_MAIL,
    payload,
});

export const togglePassword = () => ({
    type: SHOW_PASSWORD,
});

export const signup = () => ({
    type: SIGNUP,
});

export const signupSuccess = (payload) => ({
    type: SIGNUP_SUCCESS,
    payload,
});

export const signupError = (payload) => ({
    type: SIGNUP_ERROR,
    payload,
});

export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_ALL_USERS_ERROR = "FETCH_ALL_USERS_ERROR";

export const fetchAllUsers = () => ({
    type: FETCH_ALL_USERS,
});

export const fetchAllUsersSuccess = (payload) => ({
    type: FETCH_ALL_USERS_SUCCESS,
    payload,
});

export const fetchAllUsersError = (payload) => ({
    type: FETCH_ALL_USERS_ERROR,
    payload,
});

export const CHECK_USER_SLUG = "CHECK_USER_SLUG";
export const CHECK_USER_SLUG_SUCCESS = "CHECK_USER_SLUG_SUCCESS";
export const CHECK_USER_SLUG_ERROR = "CHECK_USER_SLUG_ERROR";
export const EMPTY_CHECK_USER_SLUG = "EMPTY_CHECK_USER_SLUG";
export const USERSLUG_IS_UNDEFINED = "USERSLUG_IS_UNDEFINED";

export const checkUserSlug = (payload) => ({
    type: CHECK_USER_SLUG,
    payload,
});

export const checkUserSlugSuccess = (payload) => ({
    type: CHECK_USER_SLUG_SUCCESS,
    payload,
});

export const checkUserSlugError = (payload) => ({
    type: CHECK_USER_SLUG_ERROR,
    payload,
});

export const emptyCheckUserSlug = () => ({
    type: EMPTY_CHECK_USER_SLUG,
});

export const userSlugIsUndefined = () => ({
    type: USERSLUG_IS_UNDEFINED,
});

/* JWT Update token EXP */
export const UPDATE_TOKEN_EXP = "UPDATE_TOKEN_EXP";
export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";

export const updateTokenExp = () => ({
    type: UPDATE_TOKEN_EXP,
});

export const updateAccessToken = (payload) => ({
    type: UPDATE_ACCESS_TOKEN,
    payload,
});

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const logout = () => ({
    type: LOGOUT,
});

export const logoutSucess = (payload) => ({
    type: LOGOUT_SUCCESS,
    payload,
});

export const logoutError = (payload) => ({
    type: LOGOUT_ERROR,
    payload,
});
