import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducers";

/* Middlewares */
import authMiddleware from "./middlewares/authMiddleware";
import expressionsMiddleware from "./middlewares/Admin/expressionsMiddleware";
import statsHomeMiddleware from "./middlewares/statsHomeMiddleware";
import ifollowersifollowingMiddleware from "./middlewares/ifollowersifollowingMiddleware";
import likeAndFavorisMiddleware from "./middlewares/likeAndFavorisMiddleware";

import { irecordsMiddleware } from "./middlewares/irecordsMiddleware";
import { usersMiddleware } from "./middlewares/usersMiddleware";
import { languagesMiddleware } from "./middlewares/languagesMiddleware";
import { statsMiddleware } from "./middlewares/Admin/statsMiddleware";
import { followMiddleware } from "./middlewares/followMiddleware";
import { chatMiddleware } from "./middlewares/chatMiddleware";

// Configuration object for redux-persist
const persistConfig = {
    key: "root",
    whitelist: ["user", "loginAdminReducer", "likeAndFavorisReducer"],
    storage, // define which storage to use
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(
        authMiddleware,
        chatMiddleware,
        expressionsMiddleware,
        irecordsMiddleware,
        usersMiddleware,
        languagesMiddleware,
        statsMiddleware,
        statsHomeMiddleware,
        followMiddleware,
        ifollowersifollowingMiddleware,
        likeAndFavorisMiddleware
    )
);

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, enhancers);

const persistor = persistStore(store);

export { store, persistor };
