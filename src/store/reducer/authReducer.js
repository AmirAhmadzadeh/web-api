


import * as actionTypes from '../actions/actionTypes';


const initState = {
    auth: false,
    user: null,
    error: false
}




const academyReducer = (state = initState, action) => {

    switch (action.type) {

        case actionTypes.LOGIN_PROCESS_SUCCESS:
            return {
                ...state,
                auth: true,
                error: false
            }
        case actionTypes.GET_USER_DATA_SUCCESSED:
            return {
                ...state,
                user: action.data,
                auth: true, error: false
            }

        case actionTypes.GET_USER_DATA_FAILED:
            return {
                ...state,
                user: null , 
                auth: false,
                error: false
            }
        case actionTypes.LOGIN_PROCESS_FAILED:
            return {
                ...state, auth: false, user: null, error: true
            }
        case actionTypes.LOG_OUT_SUCCESS:
            return {
                ...state,
                auth: false,
                user: null,
                error: false
            }
        case actionTypes.RESET_AUTH_ERROR:
            return {
                ...state,
                error: false
            }
        default: return {
            ...state
        }
    }
}



export default academyReducer; 