import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducers from "./reducers";
import authMiddleware from "./middlewares/authMiddleware";
import irecordsMiddleware from "./middlewares/irecordsMiddleware";
import expressionsMiddleware from "./middlewares/Admin/expressionsMiddleware";
import { loginAdminMiddleware } from "./middlewares/Admin/loginAdminMiddleware";

const persistConfig = {
    // configuration object for redux-persist
    key: "root",
    storage, // define which storage to use
    blacklist: ["expressionsReducer", "irecords"],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(
        authMiddleware,
        expressionsMiddleware,
        loginAdminMiddleware,
        irecordsMiddleware
    )
);

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, enhancers);

const persistor = persistStore(store);

export { store, persistor };
