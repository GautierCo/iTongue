import moment from "moment";
import axios from "axios";
import { updateAccessToken, updateTokenExp } from "./store/actions/userActions";

export const orderCreateByDateWithMoment = (array) => {
    return array.sort(function (element1, element2) {
        const time1 = moment(element1.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
        const time2 = moment(element2.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
        if (time1 > time2) {
            return 1;
        } else {
            return -1;
        }
    });
};

export const httpClient = {
    fetch: async (options, store) => {
        options.method = options.method || "get";
        options.url = process.env.REACT_APP_API_URL + options.url;

        // présence de store : requête qui nécessite authentification
        if (store) {
            const user = store.getState().user;

            const { accessTokenExp, refreshToken } = user;
            let { accessToken } = user;

            // console.log({
            //     exp: new Date(accessTokenExp),
            //     now: new Date(),
            //     IsStillValid: accessTokenExp > Date.now(),
            //     refreshToken,
            //     accessToken,
            // });

            // Need refresh
            if (refreshToken && (!accessToken || accessTokenExp < Date.now())) {
                console.log("token refreshing");
                const response = await httpClient.post({
                    url: "/auth/refresh",
                    data: { refreshToken: refreshToken },
                });

                accessToken = response.data.data.accessToken;
                store.dispatch(updateTokenExp());
                store.dispatch(updateAccessToken(accessToken));
            }

            const authHeader = "Bearer " + accessToken;
            if (options.headers) {
                options.headers.Authorization = authHeader;
            } else {
                options.headers = { Authorization: authHeader };
            }
        }

        return await axios(options);
    },

    post: (options, store) => {
        options.method = "post";
        return httpClient.fetch(options, store);
    },

    delete: (options, store) => {
        options.method = "delete";
        return httpClient.fetch(options, store);
    },

    get: (options, store) => {
        return httpClient.fetch(options, store);
    },
};

/*
  architecture du projet
  
  'Rails-style'
    src/
      actions/    <- action creators
      components/ <- composants stateless
      constants/  <- généralement un fichier qui exporte la liste des noms des actions
      containers/ <- classes qui interagissent avec le state
      reducers/
      selectors/
      index.js

  'Domain-style
    src/
      app/
        App.js    
        routes.js
        reducers.js
      cart/
        Cart.js    
        CartActions.js
        CartContainer.js
        CartReducer.js
      login/
        Login.js    
        LoginActions.js
        LoginContainer.js
        LoginReducer.js
      product/
        Product.js
        ProductActions.js
        ProductContainer.js
        ProductList.js
        ProductReducer.js
*/
