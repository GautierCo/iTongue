/* Expressionsiddleware */

/* Libs */
import { toast } from "react-toastify";
import { httpClient } from '../../../utils'

/* Actions */
import {
    // Fetch Data
    FETCH_EXPRESSIONS,
    fetchExpressionSuccess,
    fetchExpressionError,
    FETCH_LANGUAGES,
    fetchLanguagesSuccess,
    fetchLanguagesError,

    // Expression add
    ADD_EXPRESSION_SUBMIT,
    addExpressionSubmitSuccess,
    addExpressionSubmitError,

    // Expression delete
    DELETE_EXPRESSION,
    deleteExpressionSuccess,
    deleteExpressionError,

    // Traduction add
    ADD_TRADUCTION_SUBMIT,
    addTraductionSubmitSuccess,
    addTraductionSubmitError,

    // Traduction delete
    DELETE_TRADUCTION,
    deleteTraductionSuccess,
    deleteTraductionError,

    // Traduction edit
    EDIT_TRADUCTION_SUBMIT,
    editTraductionSubmitSuccess,
    editTraductionSubmitError,

    // Setter Traductions dans le state
    SET_TRADUCTIONS_BY_EXPRESSION,
    setTraductionsByExpression,
    setTraductionsByExpressionSuccess,

    // Add language
    ADD_LANGUAGE_SUBMIT,
    addLanguageSubmitSuccess,
    addLanguageSubmitError,

    // Delete language
    DELETE_LANGUAGE_SUBMIT,
    deleteLanguageSubmitSuccess,
    deleteLanguageSubmitError,
} from "../../actions/Admin/expressionsActions";

const expressionsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_EXPRESSIONS: {
            // OK
            httpClient.get({
                url: `/expressions`
            }, store)
                .then((res) => {
                    store.dispatch(fetchExpressionSuccess(res.data.data));
                    console.log("Expressions: ", res.data);
                })
                .catch((err) => {
                    store.dispatch(fetchExpressionError(/* Todo */));
                    toast.error("Problème lors du chargement des expressions");
                    console.error("FETCH_EXPRESSIONS", err);
                });
            break;
        }
        case FETCH_LANGUAGES: {
            httpClient.get({
                url: `/languages`
            }, store)
            .then((res) => {
                store.dispatch(fetchLanguagesSuccess(res.data.data));
            })
            .catch((err) => {
                store.dispatch(fetchLanguagesError(/* Todo */));
                toast.error("Problème lors du chargement des languages");
                console.error("FETCH_LANGUAGES", err);
            });
            break;
        }
        case SET_TRADUCTIONS_BY_EXPRESSION: {
            // OK
            const {
                expressionsList,
                expressionId,
            } = store.getState().expressionsReducer;

            const findTradByExpr = expressionsList.find(expression => {
                return expression.id === expressionId && expression.translations;
            });

            store.dispatch(
                setTraductionsByExpressionSuccess(findTradByExpr.translations)
            );
            break;
        }
        case ADD_EXPRESSION_SUBMIT: {
            // OK
            const objData = {
                label: store.getState().expressionsReducer.newExpressionInputValue,
            };

            httpClient.post({
                url: `/admin/expressions`,
                data: { ...objData },
            }, store)
                .then((res) => {
                    console.log(res)
                    store.dispatch(
                        addExpressionSubmitSuccess({
                            ...res.data.data,
                            ...objData,
                            translations: [],
                        })
                    );
                    toast.info("Nouvelle expression enregistrée avec succès");
                })
                .catch((err) => {
                    store.dispatch(addExpressionSubmitError(/* Todo */));
                    toast.error(
                        "Une erreur est survenue lors de l'ajout de votre expression"
                    );
                    console.error("ADD_EXPRESSION_SUBMIT", err);
                });
            break;
        }
        case DELETE_EXPRESSION: {
            // OK
            const { expressionsList } = store.getState().expressionsReducer;

            httpClient.delete({
                url: `/admin/expressions/${action.payload}`
            }, store)
                .then((res) => {
                    const expressionsFilter = expressionsList.filter(
                        (expression) => {
                            return expression.id === action.payload
                                ? false
                                : true;
                        }
                    );

                    store.dispatch(deleteExpressionSuccess(expressionsFilter));
                    toast.info("L'expression a bien été supprimée");
                })
                .catch((err) => {
                    store.dispatch(deleteExpressionError(/* Todo */));
                    toast.error(
                        "Une erreur est survenue lors de la suppression de cette expression"
                    );
                    console.error("DELETE_EXPRESSION", err);
                });
            break;
        }
        case ADD_TRADUCTION_SUBMIT: {
            // OK
            const {
                expressionsList,
                expressionId,
                newTraductionInputValue,
                languagesList,
            } = store.getState().expressionsReducer;

            /* Retourne le code pour le flag par rapport à l'ID */
            const findCodeById = languagesList.find(language => {
                return language.id === newTraductionInputValue.language_id && language;
            });

            const dataObj = {
                text: newTraductionInputValue.text,
                expression_id: expressionId,
                language_id: newTraductionInputValue.language_id,
                language: {
                    id: newTraductionInputValue.language_id,
                    code: findCodeById.code,
                },
            };

            httpClient.post({
                url: `/admin/translations`,
                data: { ...dataObj },
            }, store)
            .then((res) => {
                const data = res.data.data;

                const expressionListWithNewTrad = expressionsList.map(
                    (expression) => {
                        if (expression.id === expressionId) {
                            return {
                                ...expression,
                                translations: [
                                    ...expression.translations,
                                    {
                                        ...dataObj,
                                        id: data.id,
                                    },
                                ],
                            };
                        }
                        return expression;
                    }
                );

                store.dispatch(
                    addTraductionSubmitSuccess(expressionListWithNewTrad)
                );
                store.dispatch(setTraductionsByExpression());
                toast.info("Nouvelle traduction enregistrée avec succès");
            })
            .catch((err) => {
                store.dispatch(addTraductionSubmitError(/* Todo */));
                toast.error(
                    "Une erreur est survenue lors de l'ajout de votre traduction"
                );
                console.error("ADD_TRADUCTION_SUBMIT", err);
            });
            break;
        }
        case EDIT_TRADUCTION_SUBMIT: {
            // OK

            const {
                expressionsList,
                expressionId,
                editTraductionValue: traductionSelect,
            } = store.getState().expressionsReducer;

            const objData = {
                text: traductionSelect.text, // si on change rien, erreur (a voir)
                expression_id: expressionId,
                language_id: traductionSelect.language_id
                    ? traductionSelect.language_id
                    : traductionSelect.language.id, //,
            };

            httpClient.post({
                url: `/admin/translations/${traductionSelect.id}`,
                data: { ...objData },
            }, store)
            .then((res) => {
                const findExpression = expressionsList.find(
                    (expression) => expression.id === expressionId
                );

                const editTraduction = findExpression.translations.map(
                    (translation) => {
                        if (translation.id === traductionSelect.id) {
                            return traductionSelect;
                        }
                        return translation;
                    }
                );

                const newExpressionList = expressionsList.map(
                    (expression) => {
                        if (expression.id === expressionId) {
                            return {
                                ...expression,
                                translations: [...editTraduction],
                            };
                        }
                        return expression;
                    }
                );
                store.dispatch(
                    editTraductionSubmitSuccess(newExpressionList)
                );
                store.dispatch(setTraductionsByExpression());
                toast.info("La traduction a bien été modifiée");
            })
            .catch((err) => {
                store.dispatch(editTraductionSubmitError(/* Todo */));
                toast.error(
                    "Une erreur est survenue lors de la modification de la traduction"
                );
                console.error("EDIT_TRADUCTION_SUBMIT", err);
            });
            break;
        }
        case DELETE_TRADUCTION: {
            // OK

            const {
                expressionsList,
                expressionId,
            } = store.getState().expressionsReducer;

            httpClient.delete({
                url: `/admin/translations/${action.payload}`,
            }, store)
            .then((res) => {
                const findExpression = expressionsList.find(
                    (expression) => expression.id === expressionId
                );

                const removeTranslation = findExpression.translations.filter(
                    (translation) => {
                        return translation.id === action.payload
                            ? false
                            : true;
                    }
                );

                const newExpressionList = expressionsList.map(
                    (expression) => {
                        if (expression.id === expressionId) {
                            return {
                                ...expression,
                                translations: [...removeTranslation],
                            };
                        }
                        return expression;
                    }
                );

                store.dispatch(deleteTraductionSuccess(newExpressionList));
                store.dispatch(setTraductionsByExpression());
                toast.info("La traduction a bien été supprimée");
            })
            .catch((err) => {
                store.dispatch(deleteTraductionError(/* Todo */));
                toast.error(
                    "Une erreur est survenue lors de la suppression de cette traduction"
                );
                console.error("DELETE_TRADUCTION", err);
            });
            break;
        }
        case ADD_LANGUAGE_SUBMIT: {
            // OK
            const languageValue = store.getState().expressionsReducer
                .languageValue;

            httpClient.post({
                url: `/admin/languages`,
                data: languageValue,
            }, store)
            .then((res) => {
                store.dispatch(addLanguageSubmitSuccess(languageValue));
                toast.info("La langue a bien été ajoutée");
                console.log(res.data.data);
            })
            .catch((err) => {
                store.dispatch(addLanguageSubmitError(/* Todo */));
                toast.error(
                    "Une erreur est survenue lors de l'ajout de cette langue"
                );
                console.error(err);
            });
            break;
        }

        case DELETE_LANGUAGE_SUBMIT: {
            // OK
            const langId = action.payload;
            const allLanguages = store.getState().expressionsReducer.languagesList;

            console.log("allLanguages", allLanguages);

            httpClient.delete({
                url: `/admin/languages/${langId}`
            }, store)
            .then(res => {
                const response = res.data.data.deleted;
                const newLangsList = allLanguages.filter(language => language.id !== langId && language);
                store.dispatch(deleteLanguageSubmitSuccess(newLangsList));
                response && toast.info("La langue a bien été supprimée");
            })
            .catch(err => {
                console.error(err);
                store.dispatch(deleteLanguageSubmitError());
            });
            break;
        };
        default:
            break;
    }
};

export default expressionsMiddleware;
