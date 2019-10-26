import React, { useEffect } from 'react';

import { Tabs, Tab, Typography } from '@material-ui/core';

import Login from './Login';

import Register from './Register';

import { connect } from 'react-redux';

import { login, resetAuthError, registerUserToApp } from '../../store/actions/';

import { Redirect } from 'react-router-dom';

import WithClass from '../../hoc/WithClass/WithClass';

import useValue from '../../hooks/useValue';


const Auth = (props) => {

  const [value, setValue] = useValue(0);

  const [errorMessage, setErrorMessage] = React.useState(null);

  function login(email, pass) {

    props.onLoginForm(email, pass);
  
  }

  function handleGoBack() {

    props.resetAuthError();
   
    props.history.push('/');
  
  }

  function register(name, email, password) {
    
    props.registerUser(name, email, password)
 
  }

  useEffect(() => {

    // props.resetErrorMessage() ;
   
    setErrorMessage(props.auth.error ? "ایمل یا پس اشتباه است " : null)
  
  })

  function getTabsContent(params) {

    switch (value) {
     
      case 0:

        return <Login login={login} goback={handleGoBack} />;

      case 1:

        return <Register goback={handleGoBack} register={register} />;


      default:

        break;
    }

  }

  function getContent() {
    if (props.auth.user || props.auth.auth) return <Redirect to='/' />
    
    return  (
        
        <React.Fragment>
      
          <WithClass classes="auth">
      
            <h1> {errorMessage} </h1>
      
            <Tabs
      
      value={value}
      
      onChange={(e, value) => setValue(value)}
      
      indicatorColor="secondary"
             
      textColor="secondary"
             
      centered
            >
             
              <Tab label="ورود" className="tab" />
             
              <Tab label="ثبت نام" className="tab" />
  
            </Tabs>
  
            <Typography>
            
              {getTabsContent()}
           
            </Typography>
         
          </WithClass>
  
        </React.Fragment>
      
      )
 
    }
  return (
     
    getContent()
  
    )
}


const mapStateToProps = state => {

  return {
   
    auth: state.auth
 
  }
}

const mapDispatchToProps = dispatch => {

  return {
   
    onLoginForm: (email, pass) => dispatch(login(email, pass)),
   
    resetAuthError: () => dispatch(resetAuthError()),
    
    registerUser: (name, email, password) => dispatch(registerUserToApp(name, email, password))
  
  }


}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);  