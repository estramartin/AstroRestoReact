import React from 'react';
import {Button, Form} from "semantic-ui-react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {toast} from 'react-toastify';

import {loginApi} from '../../../api/user';
import {useAuth} from '../../../hooks';
import './LoginForm.scss';


export function LoginForm(){
    const {login} = useAuth();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue)=>{
            try{
                const response = await loginApi(formValue)
                const {access} = response;
                login(access);
            }
            catch (error){
                toast.error(error.message);
            }
        }
    })

    return(
       <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
        <Form.Input 
        name = "username" 
        placeholder="usuario" 
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username}
        />
        <Form.Input 
        name="password" 
        type='password' 
        placeholder="Password" 
        value= {formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
        />
        <Button type="submit" content="Iniciar sesión" primary fluid/>
      </Form>
    )
}

function initialValues(){
    return{
        username:"",
        password:"",
    }
}

function validationSchema(){
    return{
        username: Yup.string().required(true),
        password: Yup.string().required(true),
    }
}