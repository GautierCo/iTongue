import { 
    FETCH_ALL_LANGUAGES, 
    FETCH_ALL_LANGUAGES_SUCCESS, 
    FETCH_ALL_LANGUAGES_ERROR 
} 
from "../actions/languagesAction";

const initialState = {
    allLanguagesList: [],
    isLoadingAllLanguages: false,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_ALL_LANGUAGES:
            return {
                ...state,
                isLoadingAllLanguages: true,
            };
        case FETCH_ALL_LANGUAGES_SUCCESS:
            return {
                ...state,
                allLanguagesList : action.payload,
                isLoadingAllLanguages: false,
            };
        case FETCH_ALL_LANGUAGES_ERROR:
            return {
                ...state,
                isLoadingAllLanguages: false,
            };
        default:
            return state;
    }
};
