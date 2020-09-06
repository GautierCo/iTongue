import { httpClient } from "../../utils";

import {
    FOLLOW,
    followSuccess,
    followError,
    UNFOLLOW,
    unFollowSuccess,
    unFollowError,
    CHECK_IF_USER_FOLLOW,
    checkIfUserFollowSuccess,
    checkIfUserFollowError,
} from "../actions/followActions";

export const followMiddleware = (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case FOLLOW: 
            const { id, email, firstname, slug, avatarUrl,  } = store.getState().user.currentUser;
            httpClient
                .post({
                    url: `/users/${id}/follow`,
                    data: {
                        followedId: action.payload
                    }
                }, store)
                .then((res) => {
                    const data = {
                        id,
                        email,
                        firstname,
                        slug,
                        avatarUrl,
                    }
                    store.dispatch(followSuccess(data));
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(followError());
                });
            break;
        case UNFOLLOW:
            const curUserId = store.getState().user.currentUser.id;
            const userSlugInfos = store.getState().user.userSlugInfos;
            httpClient
                .delete({
                    url: `/users/${curUserId}/follow/${action.payload}`,
                }, store)
                .then((res) => {
                    console.log(res);
                    
                    const map = userSlugInfos.followers.filter(follower => follower.id !== curUserId);
                    store.dispatch(unFollowSuccess({
                        followersUpdate: map,
                        isUserFollowThisUser: false,
                    }));
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(unFollowError(err));
                });
            break;
        case CHECK_IF_USER_FOLLOW : 
            const currentUserId = store.getState().user.currentUser.id;
            const userSlug = action.payload;
            httpClient
                .get({
                    url: `/users/${currentUserId}/followed`,
                })
                .then((res) => {
                    const followers = res.data.data;
                    const userIsFollowThisUser = followers.find(follower => follower.slug == userSlug);
                    store.dispatch(checkIfUserFollowSuccess(userIsFollowThisUser? true : false));
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(checkIfUserFollowError());
                });
            break;

        default:
            break;
    };
};
