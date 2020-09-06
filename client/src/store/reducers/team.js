import { TOGGLE_MODAL, CHANGE_AVATAR} from "../actions/modalActions";

const initialState = {
    visible: false,
    myAvatar:"",
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                visible: !state.visible
            };
        case CHANGE_AVATAR:
            return {
                ...state,
                myAvatar: action.payload
            }
        default:
            return state;
    }
};
