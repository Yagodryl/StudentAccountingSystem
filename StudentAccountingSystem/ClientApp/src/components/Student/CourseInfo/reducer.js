import CourseInfoServices from "./CourseInfoServices";

export const GET_COURSE_STARTED = "courseInfo/GET_COURSE_STARTED";
export const GET_COURSE_SUCCESS = "courseInfo/GET_COURSE_SUCCESS";
export const GET_COURSE_FAILED = "courseInfo/GET_COURSE_FAILED";

const initialState ={
    loading: false,
    success: false,
    failed: false,
    errors: {},
    data: {}
}
export const courseInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSE_STARTED:{
            return {
                ...state, 
                loading: true,
                success: false,
                failed: false,
                errors: {}
            }
        }
        case GET_COURSE_SUCCESS:{
            return {
                ...state, 
                loading: false,
                success: true,
                failed: false,
                data: action.payload
            }
        }
        case GET_COURSE_FAILED:{
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

export const getCourseInfo=(id)=>{
    return dispatch =>{
        dispatch({type: GET_COURSE_STARTED});
        CourseInfoServices.getCourseInfo(id)
            .then((response)=>{
                dispatch({
                    type: GET_COURSE_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_COURSE_FAILED,
                    error: error.response.data
                })
            });
    }
}