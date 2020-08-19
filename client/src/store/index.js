import { createStore, compose, applyMiddleware } from "redux";
import rootReducers from "./reducers";
import authMiddleware from "./middlewares/authMiddleware";
import expressionsMiddleware from "./middlewares/Admin/expressionsMiddleware";
import ajaxLogMiddleware from "./middlewares/ajaxLogMiddleware"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(applyMiddleware(ajaxLogMiddleware,authMiddleware, expressionsMiddleware));

const store = createStore(rootReducers, enhancers);

export default store;
