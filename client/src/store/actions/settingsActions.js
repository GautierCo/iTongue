export const TOGGLE_MENU = "TOGGLE_MENU";
export const SET_CAPTCHA_TOKEN = "SET_CAPTCHA_TOKEN";
export const SET_PYRO_VISIBLE = "SET_PYRO_VISIBLE";

export const toggleMenu = () => ({
    type: TOGGLE_MENU,
});

export const setCaptchaToken = (token) => ({
    type: SET_CAPTCHA_TOKEN,
    payload: token,
});
export const setPyroVisible = (payload) => ({
    type: SET_PYRO_VISIBLE,
    payload,
});
