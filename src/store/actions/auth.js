






import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';
const EXPIRE = 3600;


export const tokenExpired = () => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, 1000 * EXPIRE);

    }
}

export const login = (email, password) => {
    return dispatch => {
        axios.post('/login', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.data.token);
                console.log(response.data)
                dispatch(logInSuccess(response.data));

            })
            .catch(err => {

                dispatch(logInFailed());
                setTimeout(() => {
                    dispatch(resetAuthError())
                }, 5000);
            })
    }
}

export const logInFailed = () => {
    return {
        type: actionTypes.LOGIN_PROCESS_FAILED
    }
}

export const resetAuthError = () => {
    return {
        type: actionTypes.RESET_AUTH_ERROR
    }
}

export const logInSuccess = (data) => {

    return {
        type: actionTypes.LOGIN_PROCESS_SUCCESS,
        data: data
    }
}

export const getUserData = () => {
    // http://localhost:8080/api/user?api_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYzA1ZmJlNjNkYjQ5MjZlYjRiNjhlZSIsImlhdCI6MTU1NjEyMjM1NSwiZXhwIjoxNTU2MTI1OTU1fQ.TGar3CbbUV7AmcQEW4Y1ExrGPPBuNgWKyxZDuXvaQIE

    return dispatch => {
        axios.get('/user?api_token=' + localStorage.getItem('token'))
            .then(response => {
                dispatch(getUserDataSuccesed(response.data));
                dispatch(tokenExpired());
            })
            .catch(err => {

                dispatch(getUserDataFailed());
            });
    }
}

export const getUserDataFailed = () => {
    return {
        type: actionTypes.GET_USER_DATA_FAILED
    }
}


export const getUserDataSuccesed = (data) => {

    return {
        type: actionTypes.GET_USER_DATA_SUCCESSED,
        data: data
    }
}






export const logout = () => {

    return dispatch => {
        axios.get('/logout')
            .then(response => {
                localStorage.clear();
                dispatch(logoutSuccess());

            })
            .catch(err => {
                //handle error
                console.log('eeeeee', err);
            });
    }
}


export const logoutSuccess = () => {
    return {
        type: actionTypes.LOG_OUT_SUCCESS
    }
}




//  Register User





export const registerUserToApp = (data) => {

    return dispatch => {

        axios.post('/register', {data})
            .then(response => {
                 console.log(response.data) ;     
            })
            .catch(err => {

            })

    }
}