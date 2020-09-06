import axios from "axios";
import { toast } from "react-toastify";
import { httpClient } from "../../utils";

import {
    SIGNUP,
    signupSuccess,
    signupError,
    updateTokenExp,
    LOGOUT,
    logoutSucess,
    logoutError,
    checkUserSlug,
} from "../actions/userActions";

import { 
  fetchFavoris, 
  fetchLikes 
} from "../actions/likeAndFavorisActions";

import {
  fetchFeedUser
} from "../actions/feedActions";

import { LOGIN, loginSubmitSuccess, loginSubmitError } from "../actions/loginActions";
import { socketConnect } from "../actions/chatActions";

export default (store) => (next) => (action) => {
    next(action);
    switch (action.type) {
        // réagir au signup
        case SIGNUP:
            const data = store.getState().user.signupData;

            // httpClient.post({ url: "/users", data }, true, store).then().catch();

            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/users`,
                data: {
                    ...data,
                },
            })
                .then((res) => {
                    const data = {
                        email: store.getState().user.signupData.email,
                        password: store.getState().user.signupData.password,
                    };
                    if (res.data.data.id) {
                        axios({
                            method: "post",
                            url: `${process.env.REACT_APP_API_URL}/users/login`,
                            data,
                        })
                            .then((res) => {
                                const currentUser = res.data.data;
                                store.dispatch(signupSuccess(currentUser));
                                store.dispatch(updateTokenExp());
                                store.dispatch(socketConnect());
                                toast.success(`Bienvenue ${currentUser.user.firstname}`);
                               store.dispatch(fetchFavoris(currentUser.id));
                                store.dispatch(fetchLikes(currentUser.id));
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // console.log(error.response.data.errors[0].msg);
                        store.dispatch(signupError(error.response.data.errors[0].msg));
                    }
                });
            return;
        case LOGOUT:
            httpClient
                .post(
                    {
                        url: "/users/logout",
                    },
                    store
                )
                .then((res) => {
                    console.log(res);
                    store.dispatch(logoutSucess());
                })
                .catch((err) => {
                    console.error(err);
                    store.dispatch(logoutError());
                })
                .finally((res) => {
                    store.dispatch(logoutSucess());
                });
      return;
    case LOGIN:
      const token = store.getState().settings.captchaToken;
      const dataLogin = store.getState().user.loginData;
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/users/login`,
        data: { ...dataLogin, captcha: token }
      })
        .then(res => {
          const currentUser = res.data.data;
          console.log("currentUser", currentUser);
          store.dispatch(loginSubmitSuccess(currentUser));
          store.dispatch(checkUserSlug(currentUser.user.slug));
          store.dispatch(fetchFeedUser());
          store.dispatch(socketConnect());
          store.dispatch(fetchFavoris(currentUser.id));
          store.dispatch(fetchLikes(currentUser.id));
          store.dispatch(updateTokenExp());
        })
        .catch(err => {
          store.dispatch(loginSubmitError("Email ou mot de passe incorrect"));
        });
      return;
    case LOGOUT:
      httpClient
        .post(
          {
            url: "/users/logout"
          },
          store
        )
        .then(res => {
          console.log(res);
          store.dispatch(logoutSucess());
        })
        .catch(err => {
          console.error(err);
          store.dispatch(logoutError());
        })
        .finally(res => {
          store.dispatch(logoutSucess());
        });
            return;
        default:
            return;
    }
};
