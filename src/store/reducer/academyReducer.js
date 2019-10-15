


import * as actionTypes from '../actions/actionTypes';


const initState = {
    courses: [],
    selectedCourse: null ,
    canUseCourse : false 
}




const academyReducer = (state = initState, action) => {

    switch (action.type) {

        case actionTypes.GET_ACADEMY_SUCCESS:
            return {
                ...state,
                courses: action.data , 
                canUseCourse:false 
            }

        case actionTypes.GET_SINGLE_COURSE_PAGE_INFO_SUCCESS:
            return {
                ...state,
                selectedCourse: action.data
            }
        case actionTypes.GET_CAN_USE_SUCCESS : 
           return {
               ...state ,  
               canUseCourse : action.data.canUseCourse
           }
        case actionTypes.REGISTER_COURE_SUCCESSED :
            return {
                ...state 
            }   
        default: return {
            ...state
        }
    }
}



export default academyReducer; 