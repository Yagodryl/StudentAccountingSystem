import CoursesServices from "./CoursesServices";

export const GET_COURSES_STARTED = "courses/GET_COURSES_STARTED";
export const GET_COURSES_SUCCESS = "courses/GET_COURSES_SUCCESS";
export const GET_COURSES_FAILED = "courses/GET_COURSES_FAILED";

const initialState ={
    loading: false,
    success: false,
    failed: false,
    errors: {},
    data: []
}

export const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES_STARTED:{
            return {
                ...state, 
                loading: true,
                success: false,
                failed: false,
                errors: {}
            }
        }
        case GET_COURSES_SUCCESS:{
            return {
                ...state, 
                loading: false,
                success: true,
                failed: false,
                data: action.payload
            }
        }
        case GET_COURSES_FAILED:{
            return {
                ...state, 
                loading: false,
                success: false,
                failed: true,
                errors: action.error
            }
        }
        default: return state;

    }
}

export const getCourses=()=>{
    return dispatch =>{
        dispatch({type: GET_COURSES_STARTED});
        CoursesServices.getCourses()
            .then((response)=>{
                dispatch({
                    type: GET_COURSES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_COURSES_FAILED,
                    error: error.response.data
                })
            });
    }
}