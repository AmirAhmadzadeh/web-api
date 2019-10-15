


import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';


export const getAcademy= () => {

    return dispatch => {

        axios.get('/academy')
            .then(response => {
                dispatch(getAcademySuccess(response.data.courses))
            })
            .catch(error => {
                // handle erroer later 
                console.log('some errpr' , error );
            });
    }

}



export const getAcademySuccess = (data) => {
   
    // console.log('amir is here ' , data )
    return {
        type: actionTypes.GET_ACADEMY_SUCCESS
        ,data
    }
}




export const getSinglePageCourseInfo= (courseId) => {



    return dispatch => {
        axios.get(`/academy/${courseId}`)
            .then(response => {
                dispatch(getSinglePageCourseInfoSuccess(response.data))
            })
            .catch(error => {
                // handle erroer later 
                console.log('some errpr' , error );
            });
    }

}



export const getSinglePageCourseInfoSuccess = (courseData) => {


    return {
        type: actionTypes.GET_SINGLE_COURSE_PAGE_INFO_SUCCESS
        ,
        data : courseData 
    }

}





export const registerCourse = (course) => {

    return dispatch => {
         
        axios.post('/registerCourse?api_token='+localStorage.getItem('token') ,{course}) 
              .then(response => {
                    console.log(response.data) ;
                    dispatch(getCanUseCourseForUser(course._id)) ;   
              })  
              .catch(err => {
                    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeee *D'); 
              })  ;  
    }

}


export const registerCourseSuccessed = () => {

    return {
            type : actionTypes.REGISTER_COURE_SUCCESSED 
    }
}


// get can use for user 
export const getCanUseCourseForUser = (courseId) => {
    
    return dispatch => {
         
        axios.post('/getCanUseCourseForUser?api_token=' + localStorage.getItem('token') , 
            {courseId }
        )
             .then(response => {
                   
                   dispatch(getCanUseSucceessed(response.data))  
             }) 
             .catch(err => { 
                  // handle error 
             })        
    }

}

// get can use for user 
export const getCanUseSucceessed = (data) => {
    return {
        type : actionTypes.GET_CAN_USE_SUCCESS, 
        data      
    }

}



// commenting 


export const sendComment = (cm) =>{

    return dispatch => { 
        
        console.log(cm , 'amirrrrrr'); 
        axios.post('/sendComment' ,{ ...cm })
              .then(result => { 
                  console.log(`amir is here ` , result.data) ; 

              })  
              .catch(err => { 
                  console.log('amir is here , an err ouccured' , err)  
              }); 
    }
}