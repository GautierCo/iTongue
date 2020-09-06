/* Favoris */

export const FETCH_FAVORIS = "FETCH_FAVORIS";
export const FETCH_FAVORIS_SUCCESS = "FETCH_FAVORIS_SUCCESS";
export const FETCH_FAVORIS_ERROR = "FETCH_FAVORIS_ERROR";

export const fetchFavoris = (payload) => ({
    type: FETCH_FAVORIS,
    payload,
});
export const fetchFavorisSuccess = (payload) => ({
    type: FETCH_FAVORIS_SUCCESS,
    payload,
});
export const fetchFavorisError = () => ({
    type: FETCH_FAVORIS_ERROR,
});

export const ADD_FAVORIS = "ADD_FAVORIS";
export const ADD_FAVORIS_SUCCESS = "ADD_FAVORIS_SUCCESS";
export const ADD_FAVORIS_ERROR = "ADD_FAVORIS_ERROR";

export const addFavoris = (payload) => ({
    type: ADD_FAVORIS,
    payload,
});
export const addFavorisSuccess = () => ({
    type: ADD_FAVORIS_SUCCESS,
});
export const addFavorisError = () => ({
    type: ADD_FAVORIS_ERROR,
});

export const UNFAVORIS = "UNFAVORIS";
export const UNFAVORIS_SUCCESS = "UNFAVORIS_SUCCESS";
export const UNFAVORIS_ERROR = "UNFAVORIS_ERROR";

export const unFavoris = (payload) => ({
    type: UNFAVORIS,
    payload,
});
export const unFavorisSuccess = () => ({
    type: UNFAVORIS_SUCCESS,
});
export const unFavorisError = () => ({
    type: ADD_LIKES_ERROR,
});

/* Likes */

export const FETCH_LIKES = "FETCH_LIKES";
export const FETCH_LIKES_SUCCESS = "FETCH_LIKES_SUCCESS";
export const FETCH_LIKES_ERROR = "FETCH_LIKES_ERROR";

export const fetchLikes = (payload) => ({
    type: FETCH_LIKES,
    payload,
});
export const fetchLikesSuccess = (payload) => ({
    type: FETCH_LIKES_SUCCESS,
    payload,
});
export const fetchLikesError = () => ({
    type: FETCH_LIKES_ERROR,
});

export const ADD_LIKES = "ADD_LIKES";
export const ADD_LIKES_SUCCESS = "ADD_LIKES_SUCCESS";
export const ADD_LIKES_ERROR = "ADD_LIKES_ERROR";

export const addLikes = (payload) => ({
    type: ADD_LIKES,
    payload,
});
export const addLikesSuccess = () => ({
    type: ADD_LIKES_SUCCESS,
});
export const addLikesError = () => ({
    type: ADD_LIKES_ERROR,
});
export const UNLIKES = "UNLIKES";
export const UNLIKES_SUCCESS = "UNLIKES_SUCCESS";
export const UNLIKES_ERROR = "UNLIKES_ERROR";

export const unlikes = (payload) => ({
    type: UNLIKES,
    payload,
});
export const unlikesSuccess = () => ({
    type: UNLIKES_SUCCESS,
});
export const unlikesError = () => ({
    type: ADD_LIKES_ERROR,
});
