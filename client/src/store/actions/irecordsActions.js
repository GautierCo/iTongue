export const SET_IRECORD_SELECTED_ID = "SET_IRECORD_SELECTED_ID";
export const TOGGLE_RECORDING = "TOGGLE_RECORDING";
export const SELECTED_IRECORDS_TO_RECORD = "SELECTED_IRECORDS_TO_RECORD";
export const SET_TRANSLATION_ID = "SET_TRANSLATION_ID";

export const setIrecordSelectedId = payload => ({
  type: SET_IRECORD_SELECTED_ID,
  payload
});
export const setTranslationId = payload => ({
  type: SET_TRANSLATION_ID,
  payload
});
export const toggleRecording = payload => ({
  type: TOGGLE_RECORDING,
  payload
});
export const selectIrecordToRecord = payload => ({
  type: SELECTED_IRECORDS_TO_RECORD,
  payload
});

/* Fetch all records for iRecordsPage */

export const FETCH_ALL_RECORDS = "FETCH_ALL_RECORDS";
export const FETCH_ALL_RECORDS_SUCCESS = "FETCH_ALL_RECORDS_SUCCESS";
export const FETCH_ALL_RECORDS_ERROR = "FETCH_ALL_RECORDS_ERROR";

export const fetchAllRecords = () => ({
  type: FETCH_ALL_RECORDS
});

export const fetchAllRecordsSuccess = payload => ({
  type: FETCH_ALL_RECORDS_SUCCESS,
  payload
});

export const fetchAllRecordsError = payload => ({
  type: FETCH_ALL_RECORDS_ERROR,
  payload
});

export const FETCH_EXPRESSIONS_USER = "FETCH_EXPRESSIONS_USER";
export const FETCH_EXPRESSIONS_SUCCESS_USER = "FETCH_EXPRESSIONS_SUCCESS_USER";
export const FETCH_EXPRESSIONS_ERROR_USER = "FETCH_EXPRESSIONS_ERROR_USER";

export const fetchAllExpressions = () => ({
  type: FETCH_EXPRESSIONS_USER
});
export const fetchAllExpressionsSuccess = payload => ({
  type: FETCH_EXPRESSIONS_SUCCESS_USER,
  payload
});

export const fetchAllExpressionsError = payload => ({
  type: FETCH_EXPRESSIONS_ERROR_USER,
  payload
});

/* Delete one iRecords */

export const DELETE_IRECORD = "DELETE_IRECORD";
export const DELETE_IRECORD_SUCCESS_USER_PROFIL = "DELETE_IRECORD_SUCCESS_USER_PROFIL";
export const DELETE_IRECORD_SUCCESS_IRECORDS_PAGE = "DELETE_IRECORD_SUCCESS_IRECORDS_PAGE";
export const DELETE_IRECORD_ERROR = "DELETE_IRECORD_ERROR";
export const DELETE_IRECORD_SUCCESS_HOME_PAGE = "DELETE_IRECORD_SUCCESS_HOME_PAGE";

export const deleteIrecord = payload => ({
  type: DELETE_IRECORD,
  payload
});

export const deleteIrecordSuccessUserProfile = payload => ({
  type: DELETE_IRECORD_SUCCESS_USER_PROFIL,
  payload
});
export const deleteIrecordSuccessIrecordsPage = payload => ({
  type: DELETE_IRECORD_SUCCESS_IRECORDS_PAGE,
  payload
});

export const deleteIrecordError = payload => ({
  type: DELETE_IRECORD_ERROR,
  payload
});

export const deleteIrecordSuccessHomePage = payload => ({
  type: DELETE_IRECORD_SUCCESS_HOME_PAGE,
  payload
});

/* Add one iRecords */

export const SEND_IRECORDS_RECORDED = "SEND_IRECORDS_RECORDED";
export const SEND_IRECORDS_SUCCESS = "SEND_IRECORDS_SUCCESS";
export const SEND_IRECORD_SUCCESS_USER_PROFIL = "SEND_IRECORD_SUCCESS_USER_PROFIL";
export const SEND_IRECORD_SUCCESS_IRECORDS_PAGE = "SEND_IRECORD_SUCCESS_IRECORDS_PAGE";
export const SEND_IRECORD_SUCCESS_HOME_PAGE = "SEND_IRECORD_SUCCESS_HOME_PAGE";
export const SEND_IRECORDS_ERROR = "SEND_IRECORDS_ERROR";
export const EMPTY_RECORDS_LIST = "EMPTY_RECORDS_LIST";

export const sendIrecordsRecorded = payload => ({
  type: SEND_IRECORDS_RECORDED,
  payload
});
export const sendIrecordSuccessUserProfile = payload => ({
  type: SEND_IRECORD_SUCCESS_USER_PROFIL,
  payload
});

export const sendIrecordSuccessIrecordsPage = payload => ({
  type: SEND_IRECORD_SUCCESS_IRECORDS_PAGE,
  payload
});

export const sendIrecordSuccessHomePage = payload => ({
  type: SEND_IRECORD_SUCCESS_HOME_PAGE,
  payload
});

export const sendIrecordsError = () => ({
  type: SEND_IRECORDS_ERROR
});

export const emptyRecordsList = () => ({
  type: EMPTY_RECORDS_LIST
});
