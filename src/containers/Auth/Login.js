



import React, { useEffect } from 'react'
import { Button, FormControl, FormGroup } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
 
const Login = (props) => {

    const [email, setEmail] = React.useState('');
    const [password, setPass] = React.useState('');

    

    const handleEmailChange = (e) => {

        setEmail(e.target.value);

    }

    const handlePassChange = (e) => {
        setPass(e.target.value);
    }
    const loginHandler = (e) => { 
        e.preventDefault()
        props.login(email , password);    
    }

    useEffect(() => {
        console.log() ;  
        
        ValidatorForm.addValidationRule('isPass' , (value) => {
              
              if (value.length < 5) return false ; 
              return true 
        })


        
    })
    return (
        <ValidatorForm onSubmit={loginHandler}>
            <h1 className="heading__first margin_top_mediom">
                لطفا وارد حساب کاربری خود شوید .
            </h1>
            <FormGroup>

                <FormControl className="form__controller">



                    <TextValidator
                        label="ایمیل"
                        onChange={handleEmailChange}
                        name="email"
                        value={email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                </FormControl>


                <FormControl className="form__controller">

                    <TextValidator
                        label="رمز ورود"
                        onChange={handlePassChange}
                        name="پسورد"
                        value={password}
                        validators={['required', 'isPass']}
                        errorMessages={['this field is required', 'pass is short']}
                    />
                </FormControl>
                <FormControl className="form__controller">
                    <Button type="submit" color="secondary"
                     disabled={(email && password) ? false : true} 
                     className="button button__radios">
                        وارد شدن
                </Button>
                    <Button onClick={props.goback} color="primary" className="button button__radios">  بازگشت به صفحه ی اصلی </Button>

                </FormControl>

            </FormGroup>

        </ValidatorForm>
    );
}

export default Login