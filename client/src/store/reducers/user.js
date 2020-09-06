import {
    SIGNUP_INPUT_CHANGE,
    SET_ERROR_MESSAGE_PASSWORD,
    SET_ERROR_MESSAGE_MAIL,
    SHOW_PASSWORD,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    FETCH_ALL_USERS,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_ERROR,
    CHECK_USER_SLUG,
    CHECK_USER_SLUG_SUCCESS,
    CHECK_USER_SLUG_ERROR,
    EMPTY_CHECK_USER_SLUG,
    UPDATE_TOKEN_EXP,
    UPDATE_ACCESS_TOKEN,
    USERSLUG_IS_UNDEFINED,
  } from "../actions/userActions";
  
  import {
    LOGIN_INPUT_CHANGE,
    LOGIN_SUBMIT_SUCCESS,
    LOGIN_SUBMIT_ERROR,
    LOGIN,
  } from "../actions/loginActions.js";
  
  import {
    EDIT_PROFIL,
    EDIT_PROFIL_SUCCESS,
    EDIT_PROFIL_ERROR,
    EDIT_PROFIL_INPUT,
    EDIT_PROFIL_AVATAR,
    EDIT_PROFIL_AVATAR_SUCCESS,
    EDIT_PROFIL_AVATAR_ERROR,
    EDIT_PROFIL_SLUG,
    EDIT_PROFIL_SLUG_SUCCESS,
    EDIT_PROFIL_SLUG_ERROR,
    EDIT_PROFIL_SLUG_INPUT,
  } from "../actions/editProfilActions";
  
  import {
    DELETE_IRECORD_SUCCESS_USER_PROFIL,
    SEND_IRECORD_SUCCESS_USER_PROFIL,
  } from "../actions/irecordsActions.js";
  
  import {
    FOLLOW,
    FOLLOW_SUCCESS,
    FOLLOW_ERROR,
    UNFOLLOW,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_ERROR,
    CHECK_IF_USER_FOLLOW,
    CHECK_IF_USER_FOLLOW_SUCCESS,
    CHECK_IF_USER_FOLLOW_ERROR,
  } from "../actions/followActions";
  
  import {
    FETCH_FEED_USER,
    FETCH_FEED_USER_SUCCESS,
    FETCH_FEED_USER_ERROR,
  } from "../actions/feedActions";
  
  import { SET_COUNT_COMMENT } from "../actions/commentActions";
  
  import { SOCKET_SET_RECIPIENT } from "../actions/chatActions";
  
  const initialState = {
    currentUser: {},
    isLogged: false,
    loading: false,
    accessToken: null,
    refreshToken: null,
    accessTokenExp: null,
  
    signupData: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
    },
    loginData: {
      email: "gautier.colasse@gmail.com",
      password: "123456",
      stayConnected: true,
    },
    loginErrorMessage: "",
    showPassword: false,
    errorMessagePassword: "",
    errorMessageEmail: "",
    errorMailUsed: "",
  
    /* EDIT PROFIL */
    allUsersList: [],
    userSlugInfos: {},
    userSlugUndefined: false,
    checkUserSlugLoading: false,
    isLoadingallUsers: false,
    usersListError: "",
    editProfilData: {
      id: 0,
      email: "",
      bio: "",
      avatarUrl: "",
      firstname: "",
      lastname: "",
      slug: "",
      learnedLanguages: [],
      taughtLanguages: [],
    },
    editProfilDataLoading: false,
    editProfilAvatarLoading: false,
    editProfilSlugInputValue: "",
    editProfilSlugMsg: "",
    feedUser: [],
    feedUserLoading: false,
    feedUserError: "",
    /* END EDIT PROFIL */
  
    isUserFollowThisUser: false,
    socketRecipient: 0,
  };
  export default (state = initialState, action = {}) => {
    switch (action.type) {
      case SIGNUP_INPUT_CHANGE:
        return {
          ...state,
          signupData: {
            ...state.signupData,
            ...action.payload,
          },
          errorMailUsed: "",
        };
      case SET_ERROR_MESSAGE_PASSWORD:
        return {
          ...state,
          errorMessagePassword: action.payload,
        };
      case SET_ERROR_MESSAGE_MAIL:
        return {
          ...state,
          errorMessageEmail: action.payload,
        };
      case SHOW_PASSWORD:
        return {
          ...state,
          showPassword: !state.showPassword,
        };
      case SIGNUP:
        return {
          ...state,
          loading: true,
          currentUser: "",
          errorMailUsed: "",
          errorMessageEmail: "",
          isLogged: false,
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          isLogged: true,
          signupData: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm: "",
          },
          errorMailUsed: "",
          errorMessageEmail: "",
          currentUser: { ...action.payload.user },
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          editProfilData: {
            ...state.editProfilData,
            ...action.payload.user,
          },
        };
      case SIGNUP_ERROR:
        return {
          ...state,
          isLogged: false,
          loading: false,
          signupData: {
            firstname: state.signupData.firstname,
            lastname: state.signupData.lastname,
            email: state.signupData.email,
            password: "",
            confirm: "",
          },
          currentUser: "",
          errorMessageEmail: "",
          errorMailUsed: action.payload,
        };
      case LOGIN:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUBMIT_SUCCESS:
        return {
          ...state,
          loading: false,
          loginErrorMessage: "",
          currentUser: { ...action.payload.user },
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          loginData: {
            email: "",
            password: "",
            stayConnected: true,
          },
          editProfilData: {
            ...state.editProfilData,
            ...action.payload.user,
          },
          isLogged: true,
        };
      case LOGIN_SUBMIT_ERROR:
        return {
          ...state,
          loading: false,
          loginErrorMessage: action.payload,
          currentUser: "",
          accessToken: "",
          refreshToken: "",
          loginData: {
            email: state.loginData.email,
            password: "",
            stayConnected: true,
          },
        };
      case LOGIN_INPUT_CHANGE:
        return {
          ...state,
          loginData: {
            ...state.loginData,
            ...action.payload,
          },
        };
      case LOGOUT:
        return {
          ...state,
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          accessToken: null,
          refreshToken: null,
          accessTokenExp: null,
          loginData: {
            email: "",
            password: "",
            stayConnected: true,
          },
          currentUser: {},
          loggedMessage: "",
          isLogged: false,
          errorMailUsed: "",
          errorMessageEmail: "",
          allUsersList: [],
          loginErrorMessage: "",
        };
      case LOGOUT_ERROR:
        return {
          ...state,
        };
      case FETCH_ALL_USERS:
        return {
          ...state,
          isLoadingallUsers: true,
        };
      case FETCH_ALL_USERS_SUCCESS:
        return {
          ...state,
          allUsersList: [...action.payload],
          isLoadingallUsers: false,
        };
      case FETCH_ALL_USERS_ERROR:
        return {
          ...state,
          isLoadingallUsers: false,
          usersListError: action.payload,
        };
      case EDIT_PROFIL:
        return {
          ...state,
          editProfilDataLoading: true,
        };
      case EDIT_PROFIL_SUCCESS:
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            ...action.payload.editData,
            password: "",
            confirm: "",
          },
          editProfilData: {
            ...state.editProfilData,
            ...action.payload.editData,
            password: "",
            confirm: "",
          },
          editProfilDataLoading: false,
          accessTokenExp: Date.now() + 19 * 60 * 1000,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
      case EDIT_PROFIL_ERROR:
        return {
          ...state,
          editProfilDataLoading: false,
        };
      case EDIT_PROFIL_INPUT:
        return {
          ...state,
          editProfilData: {
            ...state.editProfilData,
            ...action.payload,
          },
          userSlugInfos: {
            ...state.userSlugInfos,
            ...action.payload,
          },
        };
      case EDIT_PROFIL_AVATAR:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
          },
          editProfilAvatarLoading: true,
        };
      case EDIT_PROFIL_AVATAR_SUCCESS:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
            avatarUrl: action.payload,
          },
          currentUser: {
            ...state.currentUser,
            avatarUrl: action.payload,
          },
          editProfilData: {
            ...state.editProfilData,
            avatarUrl: action.payload,
          },
          editProfilAvatarLoading: false,
        };
      case EDIT_PROFIL_AVATAR_ERROR:
        return {
          ...state,
          editProfilAvatarLoading: false,
        };
      case CHECK_USER_SLUG:
        return {
          ...state,
          checkUserSlugLoading: true,
        };
      case CHECK_USER_SLUG_SUCCESS:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
            ...action.payload,
          },
          editProfilData: {
            ...state.editProfilData,
            ...action.payload,
          },
          checkUserSlugLoading: false,
          userSlugUndefined: false,
        };
      case CHECK_USER_SLUG_ERROR:
        return {
          ...state,
          userSlugInfos: {},
        };
      case EMPTY_CHECK_USER_SLUG:
        return {
          ...state,
          userSlugInfos: {},
        };
      case USERSLUG_IS_UNDEFINED:
        return {
          ...state,
          userSlugUndefined: true,
        };
      case EDIT_PROFIL_SLUG:
        return {
          ...state,
          checkUserSlugLoading: false,
        };
      case EDIT_PROFIL_SLUG_SUCCESS:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
            slug: action.payload,
          },
          currentUser: {
            ...state.currentUser,
            slug: action.payload,
          },
          editProfilData: {
            ...state.editProfilData,
            slug: action.payload,
          },
          editProfilSlugMsg: "",
        };
      case EDIT_PROFIL_SLUG_ERROR:
        return {
          ...state,
          editProfilSlugMsg: action.payload,
        };
      case EDIT_PROFIL_SLUG_INPUT:
        return {
          ...state,
          editProfilSlugInputValue: action.payload,
          editProfilData: {
            ...state.editProfilData,
            slug: action.payload,
          },
        };
      case DELETE_IRECORD_SUCCESS_USER_PROFIL:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
            records: [...action.payload],
          },
        };
      case SEND_IRECORD_SUCCESS_USER_PROFIL:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
            records: [...action.payload],
          },
        };
      case UPDATE_TOKEN_EXP:
        return {
          ...state,
          accessTokenExp: Date.now() + 19 * 60 * 1000,
        };
      case UPDATE_ACCESS_TOKEN:
        return {
          ...state,
          accessToken: action.payload,
        };
      case FOLLOW:
        return {
          ...state,
        };
      case FOLLOW_SUCCESS:
        return {
          ...state,
          isUserFollowThisUser: true,
          userSlugInfos: {
            ...state.userSlugInfos,
            followers: [action.payload, ...state.userSlugInfos.followers],
            followerCount: state.userSlugInfos.followerCount + 1,
          },
        };
      case FOLLOW_ERROR:
        return {
          ...state,
        };
      case UNFOLLOW:
        return {
          ...state,
        };
      case UNFOLLOW_SUCCESS:
        return {
          ...state,
          isUserFollowThisUser: action.payload.isUserFollowThisUser,
          userSlugInfos: {
            ...state.userSlugInfos,
            followers: [...action.payload.followersUpdate],
            followerCount: state.userSlugInfos.followerCount - 1,
          },
        };
      case UNFOLLOW_ERROR:
        return {
          ...state,
        };
      case CHECK_IF_USER_FOLLOW:
        return {
          ...state,
        };
      case CHECK_IF_USER_FOLLOW_SUCCESS:
        return {
          ...state,
          isUserFollowThisUser: action.payload,
        };
      case CHECK_IF_USER_FOLLOW_ERROR:
        return {
          ...state,
        };
      case FETCH_FEED_USER:
        return {
          ...state,
          feedUserLoading: true,
          feedUser: [],
          feedUserError: "",
        };
      case FETCH_FEED_USER_SUCCESS:
        return {
          ...state,
          feedUserLoading: false,
          feedUser: [...action.payload],
          feedUserError: "",
        };
  
      case FETCH_FEED_USER_ERROR:
        return {
          ...state,
          feedUserLoading: false,
          feedUser: [],
          feedUserError: "Erreur à la récupération du feed",
        };
  
      case SET_COUNT_COMMENT:
        return {
          ...state,
          userSlugInfos: {
            ...state.userSlugInfos,
            records: [...action.payload.userSlugInfos],
          },
          feedUser: action.payload.feedUser,
        };
      case SOCKET_SET_RECIPIENT:
        return {
          ...state,
          socketRecipient: action.payload,
        };
      default:
        return state;
    }
  };
  