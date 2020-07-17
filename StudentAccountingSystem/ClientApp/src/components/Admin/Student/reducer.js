import StudentServices from "./StudentServices";

export const GET_PROFILE_STARTED = "studentProfile/GET_PROFILE_STARTED";
export const GET_PROFILE_SUCCESS = "studentProfile/GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILED = "studentProfile/GET_PROFILE_FAILED";

const initialState = {
    loading: false,
    success: false,
    failed: false,
    errors: {},
    data: {}
}


export const studentProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_STARTED: {
            return {
                ...state,
                loading: true,
                success: false,
                failed: false,
                errors: {}
            }
        }
        case GET_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                failed: false,
                errors: {},
                data: action.payload
            }
        }
        case GET_PROFILE_FAILED: {
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

export const getStudentProfile = (id) => {
    return dispatch => {
        dispatch({ type: GET_PROFILE_STARTED });
        StudentServices.getStudentProfile(id)
            .then(response => {
                dispatch({
                    type: GET_PROFILE_SUCCESS,
                    payload: response.data
                })
            },
                error => {
                    throw error;
                })
            .catch(error => {
                dispatch({
                    type: GET_PROFILE_FAILED,
                    error: error.response.data
                })
            });
    }
}