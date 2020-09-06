/* statsMiddleware */

/* Libs */
import { httpClient } from '../../../utils'

/* Actions */
import {
    FETCH_STATS,
    fetchStatsSuccess,
    fetchStatsError,
} from "../../actions/Admin/statisticsActions";

export const statsMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_STATS: {
            httpClient.get({
                url: `/admin`
            }, store)
            .then(res => {
                store.dispatch(fetchStatsSuccess(res.data.data[0]));
                console.log(res);
            })
            .catch(err => {
                store.dispatch(fetchStatsError(/* TODO */));
                console.error(err);
            });
            break;
        }
        default:
            break;
    };
};