


import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';


export const getHome= () => {

    return dispatch => {

        axios.get('/home')
            .then(response => {
                dispatch(getHomeSuccess(response.data))
            })
            .catch(error => {
                // handle erroer later 
                console.log('some errpr' , error );
            });
    }

}



export const getHomeSuccess = (data) => {
    return {
        type: actionTypes.GET_HOME_SUCCESS
        , data
    }
}




