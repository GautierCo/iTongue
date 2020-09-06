export const LOGIN = 'LOGIN';
export const LOGIN_INPUT_CHANGE = 'LOGIN_INPUT_CHANGE';
export const LOGIN_SUBMIT_SUCCESS = 'LOGIN_SUBMIT_SUCCESS';
export const LOGIN_SUBMIT_ERROR = 'LOGIN_SUBMIT_ERROR';
export const SHOW_PASSWORD = "SHOW_PASSWORD";

export const login = () => ({
    type: LOGIN,
  });
export const togglePassword = () => ({
    type: SHOW_PASSWORD,
  });
export const loginInputChange = (payload) => ({
    type: LOGIN_INPUT_CHANGE,
    payload,
  });
export const loginSubmitSuccess = (payload) => ({
    type: LOGIN_SUBMIT_SUCCESS,
    payload,
  });
export const loginSubmitError = (payload) => ({
    type: LOGIN_SUBMIT_ERROR,
    payload,
  });