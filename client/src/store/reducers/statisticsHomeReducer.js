import {
  FETCH_BEST_USERS,
  FETCH_BEST_USERS_SUCCESS,
  FETCH_BEST_USERS_ERROR,
  FETCH_BEST_TRANSLATIONS,
  FETCH_BEST_TRANSLATIONS_SUCCESS,
  FETCH_BEST_TRANSLATIONS_ERROR,
  FETCH_BEST_IRECORDS,
  FETCH_BEST_IRECORDS_SUCCESS,
  FETCH_BEST_IRECORDS_ERROR,
  EMPTY_BEST_IRECORDS
} from "../actions/statisticsHomeActions";

import {
  SEND_IRECORD_SUCCESS_HOME_PAGE,
  DELETE_IRECORD_SUCCESS_HOME_PAGE
} from "../actions/irecordsActions";

const initialState = {
  bestUsers: [],
  loadingBestUsers: false,
  bestTranslations: [],
  loadingBestTranslations: false,
  bestIrecords: [],
  loadingBestIrecords: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_BEST_USERS:
      return {
        ...state,
        loadingBestUsers: true
      };
    case FETCH_BEST_USERS_SUCCESS:
      return {
        ...state,
        loadingBestUsers: false,
        bestUsers: [...action.payload]
      };
    case FETCH_BEST_USERS_ERROR:
      return {
        ...state,
        loadingBestUsers: false,
        bestUsers: []
      };
    case FETCH_BEST_TRANSLATIONS:
      return {
        ...state,
        loadingBestTranslations: true
      };
    case FETCH_BEST_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        loadingBestTranslations: false,
        bestTranslations: [...action.payload]
      };
    case FETCH_BEST_TRANSLATIONS_ERROR:
      return {
        ...state,
        loadingBestTranslations: false,
        bestTranslations: []
      };
    case FETCH_BEST_IRECORDS:
      return {
        ...state,
        loadingBestIrecords: true
      };
    case FETCH_BEST_IRECORDS_SUCCESS:
      return {
        ...state,
        loadingBestIrecords: false,
        bestIrecords: [...action.payload]
      };
    case FETCH_BEST_IRECORDS_ERROR:
      return {
        ...state,
        loadingBestIrecords: false,
        bestIrecords: []
      };
    case SEND_IRECORD_SUCCESS_HOME_PAGE:
      return {
        ...state,
        bestIrecords: [...action.payload]
      };
    case DELETE_IRECORD_SUCCESS_HOME_PAGE:
      return {
        ...state,
        bestIrecords: [...action.payload]
      };
    case EMPTY_BEST_IRECORDS:
      return {
        ...state,
        bestIrecords: null
      };
    default:
      return state;
  }
};
