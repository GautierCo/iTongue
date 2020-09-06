import {
    TOGGLE_MENU,
    SET_CAPTCHA_TOKEN,
    SET_PYRO_VISIBLE,
} from "../actions/settingsActions";

const initialState = {
    // loading: false,
    visible: false,
    pyroVisible: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                visible: !state.visible,
            };
        case SET_CAPTCHA_TOKEN:
            return {
                ...state,
                captchaToken: action.payload,
            };
        case SET_PYRO_VISIBLE:
            return {
                ...state,
                pyroVisible: action.payload,
            };
        default:
            return state;
    }
};
