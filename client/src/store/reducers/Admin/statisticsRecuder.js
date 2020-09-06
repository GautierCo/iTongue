import {
    FETCH_STATS,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_ERROR,
} from "../../actions/Admin/statisticsActions";

const initialState = {
    stats: {},
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_STATS:
            return {
                ...state,
            };
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    ...action.payload,
                }
            };
        case FETCH_STATS_ERROR:
            return {
                ...state,
            };
        default:
            return state;
    }
};
