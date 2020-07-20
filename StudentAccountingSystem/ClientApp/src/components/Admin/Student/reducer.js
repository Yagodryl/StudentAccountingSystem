import StudentServices from "./StudentServices";

export const GET_PROFILE_STARTED = "studentProfile/GET_PROFILE_STARTED";
export const GET_PROFILE_SUCCESS = "studentProfile/GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILED = "studentProfile/GET_PROFILE_FAILED";

export const EDIT_PROFILE_STARTED = "studentProfile/EDIT_PROFILE_STARTED";
export const EDIT_PROFILE_SUCCESS= "studentProfile/EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILED= "studentProfile/EDIT_PROFILE_FAILED";


const initialState = {
    loading: false,
    success: false,
    editFailed: false,
    failed: false,
    errors: {},
    editSuccess: false,
    editErrors: [],
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
                errors: action.error
            }
        }
        case EDIT_PROFILE_STARTED: {
            return {
                ...state,
                loading: true,
                editSuccess: false,
                editFailed: false,
                editErrors: []
            }
        }
        case EDIT_PROFILE_SUCCESS: {
            return {
                ...state,
                loading: false,
                editSuccess: true,
                editFailed: false,
                errors: [],
            }
        }
        case EDIT_PROFILE_FAILED: {
            return {
                ...state,
                loading: false,
                editSuccess: false,
                editFailed: true,
                editErrors: action.error
            }
        }
        default: return state;
    }
}

export const getStudentProfile = (id) => {
    return dispatch => {
        fetchProfile(dispatch, id);
    }
}

export const editStudentProfile = (model) => {
    return dispatch => {
        dispatch({ type: EDIT_PROFILE_STARTED });
        StudentServices.editStudentProfile(model)
            .then(() => {
                dispatch({
                    type: EDIT_PROFILE_SUCCESS
                })
                fetchProfile(dispatch, model.id);
            },
                error => {
                    throw error;
                })
            .catch(error => {
                dispatch({
                    type: EDIT_PROFILE_FAILED,
                    error: error.response.data.errors
                })
            });
    }
}

const fetchProfile = (dispatch, id)=>{
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