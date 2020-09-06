export const FETCH_BEST_USERS = "FETCH_BEST_USERS";
export const FETCH_BEST_USERS_SUCCESS = "FETCH_BEST_USERS_SUCCESS";
export const FETCH_BEST_USERS_ERROR = "FETCH_BEST_USERS_ERROR";
export const EMPTY_BEST_IRECORDS = "EMPTY_BEST_IRECORDS";

export const fetchBestUsers = () => ({
  type: FETCH_BEST_USERS
});
export const fetchBestUsersSuccess = payload => ({
  type: FETCH_BEST_USERS_SUCCESS,
  payload
});
export const fetchBestUsersError = () => ({
  type: FETCH_BEST_USERS_ERROR
});

export const FETCH_BEST_TRANSLATIONS = "FETCH_BEST_TRANSLATIONS";
export const FETCH_BEST_TRANSLATIONS_SUCCESS = "FETCH_BEST_TRANSLATIONS_SUCCESS";
export const FETCH_BEST_TRANSLATIONS_ERROR = "FETCH_BEST_TRANSLATIONS_ERROR";

export const fetchBestTranslations = () => ({
  type: FETCH_BEST_TRANSLATIONS
});
export const fetchBestTranslationsSuccess = payload => ({
  type: FETCH_BEST_TRANSLATIONS_SUCCESS,
  payload
});
export const fetchBestTranslationsError = () => ({
  type: FETCH_BEST_TRANSLATIONS_ERROR
});

export const FETCH_BEST_IRECORDS = "FETCH_BEST_IRECORDS";
export const FETCH_BEST_IRECORDS_SUCCESS = "FETCH_BEST_IRECORDS_SUCCESS";
export const FETCH_BEST_IRECORDS_ERROR = "FETCH_BEST_IRECORDS_ERROR";

export const fetchBestIrecords = () => ({
  type: FETCH_BEST_IRECORDS
});
export const fetchBestIrecordsSuccess = payload => ({
  type: FETCH_BEST_IRECORDS_SUCCESS,
  payload
});
export const fetchBestIrecordsError = () => ({
  type: FETCH_BEST_IRECORDS_ERROR
});

export const emptyBestIrecords = () => ({
  type: EMPTY_BEST_IRECORDS
});
