import React , { useEffect } from 'react';

import { Tabs, Tab, Typography } from '@material-ui/core';

import Login from './Login';

import Register from './Register';

import { connect } from 'react-redux';

import { login, resetAuthError , registerUserToApp } from '../../store/actions/';

import { Redirect } from 'react-router-dom';

import WithClass from '../../hoc/WithClass/WithClass';


const Auth = (props) => {
  const [value, setValue] = React.useState(0);
  const [errorMessage , setErrorMessage] = React.useState(null) ; 
 
  function handleChange(e, value) {
    setValue(value)
  }

  function login(email,pass) {
    
    props.onLoginForm(email, pass);
  }
  function handleGoBack() { 
    //code 
    props.resetAuthError() ;
    props.history.push('/');
  }

  function register(name , email , password) { 

      props.registerUser(name , email , password )
  }

  useEffect(() => {
    
      // props.resetErrorMessage() ;
      
      setErrorMessage(props.auth.error ? "ایمل یا پس اشتباه است " : null)
  })

  let tabsConetnt = null;
  switch (value) {
    case 0:
      tabsConetnt = <Login login={login} goback={handleGoBack} />;
      break;
    case 1:
      tabsConetnt = <Register   goback={handleGoBack} register={register} />;
      break;

    default:
      break;
  }
 
  let content = null;

  if (props.auth.user || props.auth.auth) content = <Redirect to='/' />
  else {
    content = (
    <React.Fragment>
      
   
    <WithClass classes="auth">
        <h1> {errorMessage} </h1>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          centered
        >
          <Tab label="ورود" className="tab" />
          <Tab label="ثبت نام" className="tab" />

        </Tabs>

        <Typography>
          {tabsConetnt}
        </Typography>
      </WithClass>

      </React.Fragment>
    )
  }
  return (

    content
  )
}


const mapStateToProps = state => {

  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onLoginForm: (email, pass) => dispatch(login(email, pass)) , 
    resetAuthError  : () => dispatch(resetAuthError()) , 
    registerUser : (name , email, password) => dispatch(registerUserToApp(name ,email , password ))
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);  