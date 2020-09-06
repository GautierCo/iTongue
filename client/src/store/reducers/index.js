import { combineReducers } from "redux";

// Admin
import expressionsReducer from "./Admin/expressionsReducer";
import statisticsRecuder from "./Admin/statisticsRecuder";

/* Reducers */
import settings from "./settings";
import user from "./user";
import irecords from "./irecords";
import languagesReducer from "./languagesReducer";
import statisticsHomeReducer from "./statisticsHomeReducer";
import ifollowersifollowing from "./ifollowersifollowingReducer";
import team from './team';
import likeAndFavorisReducer from "./likeAndFavorisReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
    settings,
    user,
    chatReducer,
    expressionsReducer,
    irecords,
    languagesReducer,
    statisticsRecuder,
    statisticsHomeReducer,
    ifollowersifollowing,
    team,
    likeAndFavorisReducer
});
