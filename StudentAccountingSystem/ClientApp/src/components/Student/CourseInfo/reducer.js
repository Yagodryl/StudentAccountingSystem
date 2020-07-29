import CourseInfoServices from "./CourseInfoServices";
import { push } from "react-router-redux";

export const GET_COURSE_STARTED = "courseInfo/GET_COURSE_STARTED";
export const GET_COURSE_SUCCESS = "courseInfo/GET_COURSE_SUCCESS";
export const GET_COURSE_FAILED = "courseInfo/GET_COURSE_FAILED";

export const SUBSCRIBE_STARTED = "courseInfo/SUBSCRIBE_STARTED";
export const SUBSCRIBE_SUCCESS = "courseInfo/SUBSCRIBE_SUCCESS";
export const SUBSCRIBE_FAILED = "courseInfo/SUBSCRIBE_FAILED";


const initialState = {
    loading: false,
    success: false,
    failed: false,
    errors: [],
    data: {},
    subscribe: {
        loading: false,
        success: false,
        failed: false,
        errors: [],
    }
}
export const courseInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSE_STARTED: {
            return {
                ...state,
                loading: true,
                success: false,
                failed: false,
                errors: []
            }
        }
        case GET_COURSE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                failed: false,
                data: action.payload
            }
        }
        case GET_COURSE_FAILED: {
            return {
                ...state,
                loading: false,
                success: false,
                failed: true,
                errors: action.errors
            }
        }
        case SUBSCRIBE_STARTED: {
            return {
                ...state,
                subscribe: {
                    loading: true,
                    success: false,
                    failed: false,
                    errors: []
                }
            }
        }
        case SUBSCRIBE_SUCCESS: {
            return {
                ...state,
                subscribe: {
                    loading: false,
                    success: true,
                    failed: false,
                }
            }
        }
        case SUBSCRIBE_FAILED: {
            return {
                ...state,
                subscribe: {

                    loading: false,
                    success: false,
                    failed: true,
                    errors: action.errors
                }
            }
        }
        default: return state;

    }
}

export const getCourseInfo = (id) => {
    return dispatch => {
        dispatch({ type: GET_COURSE_STARTED });
        CourseInfoServices.getCourseInfo(id)
            .then((response) => {
                dispatch({
                    type: GET_COURSE_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_COURSE_FAILED,
                    errors: error.response.data
                })
            });
    }
}

export const subscribe = (model) => {
    return dispatch => {
        dispatch({ type: SUBSCRIBE_STARTED });
        CourseInfoServices.subscribe(model)
            .then(() => {
                dispatch({
                    type: SUBSCRIBE_SUCCESS
                })
                // dispatch(push('/student/profile'));
            })
            .catch(error => {
                dispatch({
                    type: SUBSCRIBE_FAILED,
                    errors: error.response.data.errors
                })
            });
    }
}