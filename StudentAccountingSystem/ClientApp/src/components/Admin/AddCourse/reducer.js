import AddCourseServices from './AddCourseServices';
import { push } from 'react-router-redux';

export const ADD_COURSE_STARTED = "addCourse/ADD_COURSE_STARTED";
export const ADD_COURSE_SUCCESS = "addCourse/ADD_COURSE_SUCCESS";
export const ADD_COURSE_FAILED = "addCourse/ADD_COURSE_FAILED";

const initialState ={
    loading: false,
    success: false,
    failed: false,
    errors: [],
}

export const addCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COURSE_STARTED:{
            return {
                ...state, 
                loading: true,
                success: false,
                failed: false,
                errors: []
            }
        }
        case ADD_COURSE_SUCCESS:{
            return {
                ...state, 
                loading: false,
                success: true,
                failed: false,
                errors: []
            }
        }
        case ADD_COURSE_FAILED:{
            return {
                ...state, 
                loading: false,
                success: false,
                failed: true,
                errors: action.errors
            }
        }
        default: return state;

    }
}

export const addCourse=(model)=>{
    return dispatch =>{
        dispatch({type: ADD_COURSE_STARTED});
        AddCourseServices.addCourse(model)
        .then(()=>{
            dispatch({type: ADD_COURSE_SUCCESS});
            // dispatch(push("/admin/list-students"))
        })
        .catch((err)=>{
            dispatch({
                type: ADD_COURSE_FAILED,
                errors: err.response.data.errors
            });
        })
    }
}