export const FETCH_STATS = "FETCH_STATS";
export const FETCH_STATS_SUCCESS = "FETCH_STATS_SUCCESS";
export const FETCH_STATS_ERROR = "FETCH_STATS_ERROR";

export const fetchStats = () => ({
    type: FETCH_STATS,
});

export const fetchStatsSuccess = (payload) => ({
    type: FETCH_STATS_SUCCESS,
    payload,
});

export const fetchStatsError = (payload) => ({
    type: FETCH_STATS_ERROR,
    payload,
});