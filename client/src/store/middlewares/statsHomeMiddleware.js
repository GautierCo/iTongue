import { httpClient } from "../../utils";

import {
    FETCH_BEST_USERS,
    FETCH_BEST_TRANSLATIONS,
    FETCH_BEST_IRECORDS,
    fetchBestUsersSuccess,
    fetchBestUsersError,
    fetchBestTranslationsSuccess,
    fetchBestTranslationsError,
    fetchBestIrecordsSuccess,
    fetchBestIrecordsError,
} from "../actions/statisticsHomeActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_BEST_USERS:
            httpClient
                .get({
                    url: "/best/users?limit=5",
                })
                .then((res) => {
                    // console.log(res.data.data);
                    store.dispatch(fetchBestUsersSuccess(res.data.data));
                })
                .catch((err) => {
                    // console.log(err);
                    store.dispatch(fetchBestUsersError(err));
                });
            return;
        case FETCH_BEST_TRANSLATIONS:
            httpClient
                .get({
                    url: "/best/translations?limit=5",
                })
                .then((res) => {
                    // console.log(res.data.data);
                    store.dispatch(fetchBestTranslationsSuccess(res.data.data));
                })
                .catch((err) => {
                    // console.log(err);
                    store.dispatch(fetchBestTranslationsError(err));
                });
            return;
        case FETCH_BEST_IRECORDS:
            httpClient
                .get({
                    url: "/best/lastirecords?limit=5",
                })
                .then((res) => {
                    store.dispatch(fetchBestIrecordsSuccess(res.data.data));
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(fetchBestIrecordsError(err));
                });
            return;
        default:
            return;
    }
};
