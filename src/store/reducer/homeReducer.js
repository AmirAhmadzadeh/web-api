


import * as actionTypes from '../actions/actionTypes';


const initState = {
    menus: []
}




const menuReducer = (state = initState, action) => {

    switch (action.type) {

        case actionTypes.GET_HOME_SUCCESS: 
        return {
             ...state , 
             menus : action.data.menus    
        }

        default: return {
            ...state
        }
    }
}



export default menuReducer; 