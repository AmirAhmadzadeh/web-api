



import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormGroup } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useInputState from '../../hooks/useInputState';

function Register(props) {

    const [name, setName] = useInputState('');
    const [email, setEmail] = useInputState('');
    const [pass, setPass] = useInputState('');
    const [confPass, setConfPass] = useInputState('');


    const registerHandler = (e) => {
        e.preventDefault();
        props.register(name, email, pass);
    }

   
    useEffect(() => {

        ValidatorForm.addValidationRule('Pass Name Length', (val) => {
            if (val.length < 5) return false
            return true;
        })


        ValidatorForm.addValidationRule('Check Conf', (val) => {
            if (val === pass) return true;
            return false;
        })
    }, [name, pass, confPass]);

    return (
        
        <ValidatorForm onSubmit={registerHandler}>
            
            <h1 className="heading__first margin_top_mediom">

                ساختن حساب کاربری
            
            </h1>
            <FormGroup>

                <FormControl className="form__controller">

                    <TextValidator

                        label="نام"

                        onChange={(e) => setName(e.target.value)}

                        name="name"

                        value={name}

                        validators={['required', 'Pass Name Length']}

                        errorMessages={['this field is required', 'is Short ']}

                    />

                </FormControl>

                <FormControl className="form__controller">

                    <TextValidator

                        label="ایمیل"

                        onChange={(e) => setEmail(e.target.value)}

                        name="email"

                        value={email}

                        validators={['required', 'isEmail']}

                        errorMessages={['this field is required', 'email is not valid']}

                    />

                </FormControl>


                <FormControl className="form__controller">

                    <TextValidator

                        label="رمز ورود"

                        onChange={(e) => setPass(e.target.value)}

                        name="pass"

                        value={pass}

                        validators={['required', 'Pass Name Length']}

                        errorMessages={['this field is required', 'pass is short']}

                    />

                </FormControl>



                <FormControl className="form__controller">

                    <TextValidator

                        label="رمز ورود تایید"

                        onChange={(e) => setConfPass(e.target.value)}

                        name="confPass"

                        value={confPass}

                        validators={['required', 'Pass Name Length', 'Check Conf']}

                        errorMessages={['this field is required', 'pass is short', 'مطابق نیست ']}

                    />

                </FormControl>

                <FormControl className="form__controller">

                    <Button type="submit" color="secondary"

                        disabled={(email && pass && name && confPass) ? false : true}

                        className="button button__radios">
                        وارد شدن

                </Button>

                    <Button onClick={props.goback} color="primary" className="button button__radios">  بازگشت به صفحه ی اصلی </Button>

                </FormControl>

            </FormGroup>

        </ValidatorForm>

    )

}



export default Register; 