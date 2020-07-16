import ListStudentsServices from "./ListStudentsServices";

export const GET_STUDENTS_STARTED = "listStudents/GET_STUDENTS_STARTED";
export const GET_STUDENTS_SUCCESS = "listStudents/GET_STUDENTS_SUCCESS";
export const GET_STUDENTS_FAILED = "listStudents/GET_STUDENTS_FAILED";

const initialState = {
    loading: false,
    success: false,
    failed: false,
    errors: {},
    data: {
        totalCount: 0,
        students: [],
        currentPage: 1
    }
}

export const listStudentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STUDENTS_STARTED: {
            return {
                ...state,
                loading: true,
                success: false,
                failed: false,
                errors: {}
            }
        }
        case GET_STUDENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                failed: false,
                data: action.payload,
                
            }
        }
        case GET_STUDENTS_FAILED: {
            return {
                ...state,
                loading: false,
                success: false,
                failed: true,
                // errors: action.errors
            }
        }
        default: return state;
    }
}

export const getListStudents = (filter) => {
    return dispatch => {
        dispatch({ type: GET_STUDENTS_STARTED });
        ListStudentsServices.getListStudent(filter)
            .then((response)=>{
                dispatch({
                    type: GET_STUDENTS_SUCCESS,
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: GET_STUDENTS_FAILED,
                    // error: error.response.data
                })
            });
    }
}