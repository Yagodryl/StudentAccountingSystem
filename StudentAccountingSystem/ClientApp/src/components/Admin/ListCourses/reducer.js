import ListCoursesServices from "./ListCoursesServices";

export const GET_COURSES_STARTED = "listCourses/GET_COURSES_STARTED";
export const GET_COURSES_SUCCESS = "listCourses/GET_COURSES_SUCCESS";
export const GET_COURSES_FAILED = "listCourses/GET_COURSES_FAILED";

const initialState ={
    loading: false,
    success: false,
    failed: false,
    errors: [],
    data: []
}

export const listCoursesReducer = (state = initialState, action) => {
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
        ListCoursesServices.getCourses()
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