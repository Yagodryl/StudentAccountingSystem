import MyCoursesServices from "./MyCoursesServices"

export const GET_MY_COURSES_STARTED = "myCourses/GET_MY_COURSES_STARTED";
export const GET_MY_COURSES_SUCCESS = "myCourses/GET_MY_COURSES_SUCCESS";
export const GET_MY_COURSES_FAILED = "myCourses/GET_MY_COURSES_FAILED";

const initialState ={
    loading: false,
    success: false,
    failed: false,
    errors: {},
    data: []
}

export const myCoursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_COURSES_STARTED:{
            return {
                ...state, 
                loading: true,
                success: false,
                failed: false,
                errors: {}
            }
        }
        case GET_MY_COURSES_SUCCESS:{
            return {
                ...state, 
                loading: false,
                success: true,
                failed: false,
                data: action.payload
            }
        }
        case GET_MY_COURSES_FAILED:{
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

export const getMyCourses=()=>{
    return dispatch =>{
        dispatch({type: GET_MY_COURSES_STARTED});
        MyCoursesServices.getMyCourses()
            .then((response)=>{
                dispatch({
                    type: GET_MY_COURSES_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_MY_COURSES_FAILED,
                    error: error.response.data
                })
            });
    }
}
