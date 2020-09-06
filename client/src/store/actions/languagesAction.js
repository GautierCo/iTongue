export const FETCH_ALL_LANGUAGES = "FETCH_ALL_LANGUAGES";
export const FETCH_ALL_LANGUAGES_SUCCESS = "FETCH_ALL_LANGUAGES_SUCCESS";
export const FETCH_ALL_LANGUAGES_ERROR = "FETCH_ALL_LANGUAGES_ERROR";

export const fetchAllLanguages = () => ({
    type: FETCH_ALL_LANGUAGES,
});

export const fetchAllLanguagesSuccess = (payload) => ({
    type: FETCH_ALL_LANGUAGES_SUCCESS,
    payload,
});

export const fetchAllLanguagesError = (payload) => ({
    type: FETCH_ALL_LANGUAGES_ERROR,
    payload,
});