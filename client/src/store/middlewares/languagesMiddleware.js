import { httpClient } from '../../utils'

import { 
    FETCH_ALL_LANGUAGES, 
    fetchAllLanguagesSuccess, 
    fetchAllLanguagesError 
} from '../actions/languagesAction';

export const languagesMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_ALL_LANGUAGES: 
            httpClient.get({
                url: `/languages`
            }, store)
            .then(res => {
                const allLanguagesList = res.data.data;
                store.dispatch(fetchAllLanguagesSuccess(allLanguagesList));
            })
            .catch(err => {
                console.error(err);
                store.dispatch(fetchAllLanguagesError(/* Todo */));
            });
            break;
        default:
            break;
    };
};