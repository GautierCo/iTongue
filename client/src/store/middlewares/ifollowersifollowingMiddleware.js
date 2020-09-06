import { httpClient } from "../../utils";

import {
    FETCH_IFOLLOWERS,
    fetchIfollowersSuccess,
    fetchIfollowersError,
    FETCH_IFOLLOWING,
    fetchIfollowingSuccess,
    fetchIfollowingError,
} from "../actions/ifollowersifollowingActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FETCH_IFOLLOWERS:
            // const { id } = store.getState().user.userSlugInfos;
            const id = store.getState().ifollowersifollowing
                .selectedUserIdToFetchSubscriptions.userId;

            httpClient
                .get(
                    {
                        url: `/users/${id}/followers`,
                    },
                    store
                )
                .then((res) => {
                    // console.log(res);
                    store.dispatch(fetchIfollowersSuccess(res.data.data));
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchIfollowersError());
                });
            return;
        case FETCH_IFOLLOWING:
            httpClient
                .get(
                    {
                        url: `/users/${
                            store.getState().ifollowersifollowing
                                .selectedUserIdToFetchSubscriptions.userId
                        }/followed`,
                    },
                    store
                )
                .then((res) => {
                    store.dispatch(fetchIfollowingSuccess(res.data.data));
                })
                .catch((_) => {
                    console.log("error");
                    store.dispatch(fetchIfollowingError());
                });
            return;
        default:
            return;
    }
};
