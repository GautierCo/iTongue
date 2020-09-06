/* Reducer Expressions */

/* Actions */
import { 
    FETCH_EXPRESSIONS_SUCCESS,
    FETCH_EXPRESSIONS_ERROR,

    FETCH_LANGUAGES_SUCCESS,

    ADD_EXPRESSION_SUBMIT,
    ADD_EXPRESSION_SUBMIT_SUCCESS,
    ADD_EXPRESSION_SUBMIT_ERROR,
    ADD_EXPRESSION_INPUT_VALUE,
    DELETE_EXPRESSION_SUCCESS,
    DELETE_EXPRESSION_ERROR,

    EXPRESSION_ID_SELECT,
    SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS,

    ADD_TRADUCTION_SUBMIT,
    ADD_TRADUCTION_SUBMIT_SUCCESS,
    ADD_TRADUCTION_SUBMIT_ERROR,
    ADD_TRADUCTION_INPUT_VALUE,
    DELETE_TRADUCTION_SUCCESS,
    EDIT_TRADUCTION_SUBMIT,
    EDIT_TRADUCTION_SUBMIT_SUCCESS,
    EDIT_TRADUCTION_INPUT_VALUE,

    ADD_LANGUAGE_SUBMIT_SUCCESS,
    ADD_LANGUAGE_SUBMIT_ERROR,
    LANGUAGE_INPUT_VALUE,
    ADD_LANGUAGE_SUBMIT,
    DELETE_LANGUAGE_SUBMIT,
    DELETE_LANGUAGE_SUBMIT_SUCCESS,
    DELETE_LANGUAGE_SUBMIT_ERROR,


 } from '../../actions/Admin/expressionsActions';

/* State */
const initialState = {
    newExpressionInputValue: '',
    newExpressionLoading: false,
    expressionsList: [],
    traductionsList: [],
    languagesList: [],
    expressionId: 0,

    newTraductionInputValue: {
        text: '',
        language: {
            code: '',
        }
    },
    newTraductionLoading: false,

    editTraductionValue: {
        id: 0,
        language: '',
        translation: '',
    },

    languageValue: {
        name: '', // Nom du language
        code: '', // Code du language ex: 'fr'
    },
    newLanguageLoading: false,
};

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case FETCH_EXPRESSIONS_SUCCESS: 
            return {
                ...state,
                expressionsList: [
                    ...action.payload
                ],
            };
        case FETCH_LANGUAGES_SUCCESS:
            return {
                ...state,
                languagesList: [
                    ...action.payload
                ]
            }
        case FETCH_EXPRESSIONS_ERROR: 
            return {
                ...state,
            };
        case ADD_EXPRESSION_SUBMIT:
            return {
                ...state,
                newExpressionLoading: true,
            };
        case ADD_EXPRESSION_SUBMIT_SUCCESS:
            return {
                ...state,
                newExpressionLoading: false,
                expressionsList: [
                    ...state.expressionsList,
                    action.payload,
                ],
                newExpressionInputValue: '',
            };   
        case ADD_EXPRESSION_SUBMIT_ERROR:
            return {
                ...state,
                newExpressionLoading: false,
            };
        case ADD_EXPRESSION_INPUT_VALUE:
            return {
                ...state,
                newExpressionInputValue: action.payload,
            };
        case DELETE_EXPRESSION_SUCCESS : 
            return {
                ...state,
                expressionsList: [...action.payload],
            };
        case SET_TRADUCTIONS_BY_EXPRESSION_SUCCESS: 
            return {
                ...state,
                traductionsList: [...action.payload],
            };
        case EXPRESSION_ID_SELECT:
            return {
                ...state,
                expressionId: action.payload,
            };
        case ADD_TRADUCTION_SUBMIT: 
            return {
                ...state,
                newTraductionLoading: true,
            };
        case ADD_TRADUCTION_SUBMIT_SUCCESS: 
            return {
                ...state,
                newTraductionLoading: false,
                expressionsList: [...action.payload],
                newTraductionInputValue: {
                    text: '',
                    language: {
                        code: '',
                    },
                },
            };
        case ADD_TRADUCTION_SUBMIT_ERROR: 
            return {
                ...state,
                newTraductionLoading: false,
            };
        case ADD_TRADUCTION_INPUT_VALUE: 
            return {
                ...state,
                newTraductionInputValue: { 
                    ...state.newTraductionInputValue,
                    ...action.payload,
                    language: {
                        code: action.payload.code
                    },
                },
            };
        case EDIT_TRADUCTION_SUBMIT :
            return {
                ...state,
            };
        case EDIT_TRADUCTION_SUBMIT_SUCCESS: 
            return {
                ...state,
                expressionsList: [...action.payload],
                editTraductionValue: {
                    id: 0,
                    language: '',
                    translation: '',
                },
            };
        case EDIT_TRADUCTION_INPUT_VALUE:
            return {
                ...state,
                editTraductionValue: {
                    ...state.editTraductionValue,
                    ...action.payload,
                    text: action.payload.translation
                },
            };
        case DELETE_TRADUCTION_SUCCESS :
            return {
                ...state,
                expressionsList: [...action.payload],
            };
        case DELETE_EXPRESSION_ERROR :
            return {
                ...state,
            };
        case ADD_LANGUAGE_SUBMIT: 
            return {
                ...state,
                newLanguageLoading: true,
            };
        case ADD_LANGUAGE_SUBMIT_SUCCESS: 
            return {
                ...state,
                languagesList: [
                    ...state.languagesList,
                    {...action.payload}
                ],
                newLanguageLoading: false,
            };
        case ADD_LANGUAGE_SUBMIT_ERROR: 
            return {
                ...state,
                newLanguageLoading: false,
            };
        case LANGUAGE_INPUT_VALUE: 
            return {
                ...state,
                languageValue: {
                    ...state.languageValue,
                    ...action.payload
                }
            };
        case DELETE_LANGUAGE_SUBMIT: 
            return {
                ...state,
            };
        case DELETE_LANGUAGE_SUBMIT_SUCCESS: 
            return {
                ...state,
                languagesList: [...action.payload],
            };
        case DELETE_LANGUAGE_SUBMIT_ERROR: 
            return {
                ...state,
            };
    default:
            return state;
    };
};