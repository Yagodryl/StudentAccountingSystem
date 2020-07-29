import jwt from "jsonwebtoken";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import LoginAndRegisterServices from "./LoginAndRegisterServices"
import isEmpty from "lodash/isEmpty";
import { push } from 'react-router-redux';

export const LOGIN_POST_STARTED = "login/LOGIN_POST_STARTED";
export const LOGIN_POST_SUCCESS = "login/LOGIN_POST_SUCCESS";
export const LOGIN_POST_FAILED = "login/LOGIN_POST_FAILED";

export const LOGIN_FACEBOOK_STARTED = "facebook/LOGIN_FACEBOOK_STARTED";
export const LOGIN_FACEBOOK_SUCCESS = "facebook/LOGIN_FACEBOOK_SUCCESS";
export const LOGIN_FACEBOOK_FAILED = "facebook/LOGIN_FACEBOOK_FAILED";

export const REGISTER_POST_STARTED = "register/REGISTER_POST_STARTED";
export const REGISTER_POST_SUCCESS = "register/REGISTER_POST_SUCCESS";
export const REGISTER_POST_FAILED = "register/REGISTER_POST_FAILED";

export const LOGIN_SET_CURRENT_USER = "login/SET_CURRENT_USER";

const initialState = {
    loading: false,
    success: false,
    registerSuccess: false,
    registerFailed: false,
    registerErrors: [],
    loginFailed:false,
    loginErrors: [],
    isAuthenticated: false,
    user: {
        id: "",
        name: "",
        image: "",
        roles: []
    }
};

export const loginAndRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_POST_STARTED: {
            return {
                ...state,
                loading: true,
                success: false,
                loginFailed : false,
                loginErrors: []
            }
        }
        case LOGIN_POST_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                loginFailed: false,
                loginErrors: []
            }
        }
        case LOGIN_POST_FAILED: {
            return {
                ...state,
                loading: false,
                success: false,
                loginFailed: true,
                loginErrors: action.errors
            }
        }

        case LOGIN_FACEBOOK_STARTED: {
            return {
                ...state,
                loading: true,
                success: false,
                loginFailed : false,
                loginErrors: []
            }
        }
        case LOGIN_FACEBOOK_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                loginFailed: false,
                loginErrors: []
            }
        }
        case LOGIN_FACEBOOK_FAILED: {
            return {
                ...state,
                loading: false,
                success: false,
                loginFailed: true,
                loginErrors: action.errors
            }
        }

        case LOGIN_SET_CURRENT_USER: {
            return {
                ...state,
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        }

        case REGISTER_POST_STARTED: {
            return {
                ...state,
                loading: true,
                registerSuccess: false,
                registerFailed: false,
                registerErrors: []
            }
        }
        case REGISTER_POST_SUCCESS: {
            return {
                ...state,
                loading: false,
                registerSuccess: true,
                registerFailed: false,
                registerErrors: []
            }
        }
        case REGISTER_POST_FAILED: {
            return {
                ...state,
                loading: false,
                registerSuccess: false,
                registerFailed: true,
                registerErrors: action.errors
            }
        }
        default: return state;
    };
};

export const login = model => {
    return dispatch => {
        dispatch({ type: LOGIN_POST_STARTED });
        LoginAndRegisterServices.login(model)
            .then(
                response => {
                    dispatch({ type: LOGIN_POST_SUCCESS });
                    loginByJWT(response.data, dispatch);
                    const pushUrl = getUrlToRedirect();
                    dispatch(push(pushUrl));
                }, err => {
                    throw err;
                }
            )
            .catch(err => {
                dispatch({
                    type: LOGIN_POST_FAILED,
                    errors: err.response.data.errors
                });
            });
    }
}

export const loginFacebook = model=>{
    return dispatch =>{
        dispatch({type: LOGIN_FACEBOOK_STARTED});
        LoginAndRegisterServices.loginFacebook(model)
            .then(
                response=>{
                    dispatch({type: LOGIN_FACEBOOK_SUCCESS});
                    loginByJWT(response.data, dispatch);
                    const pushUrl = getUrlToRedirect();
                    dispatch(push(pushUrl));
                }, err => {
                    throw err;
                }
            )
            .catch(err => {
                dispatch({
                    type: LOGIN_FACEBOOK_FAILED,
                    errors: err.response.data.errors
                });
            });
    }
}

export function logout() {
    return dispatch => {
        logoutByJWT(dispatch);
    };
}

export const register = model => {
    return dispatch => {
        dispatch({ type: REGISTER_POST_STARTED });
        LoginAndRegisterServices.register(model)
            .then(
                response => {
                    dispatch({ type: REGISTER_POST_SUCCESS });
                }, err => {
                    throw err;
                }
            )
            .catch(err => {
                dispatch({
                    type: REGISTER_POST_FAILED,
                    errors: err.response.data.errors
                });
            });
    }
}


function getUrlToRedirect() {
    var user = jwt.decode(localStorage.jwtToken);
    //let roles =[];
    let roles = user.roles;
    let path = "";
    if (Array.isArray(roles)) {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === "Student") {
                path = "/student/profile";
            } else if (roles[i] === "Admin") {
                path = "/admin/list-students";
            }
        }
    } else {
        if (roles === "Student") {
            path = "/student/profile";
        } else if (roles === "Admin") {
            path = "/admin/list-students";
        }
    }
    return path;
}

export const loginByJWT = (token, dispatch) => {

    var user = jwt.decode(token);
    if (!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);
    dispatch({
        type: LOGIN_SET_CURRENT_USER,
        user
    });
};

export const logoutByJWT = dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch({
        type: LOGIN_SET_CURRENT_USER,
        user: {}
    });
    dispatch(push('/login'));
};
