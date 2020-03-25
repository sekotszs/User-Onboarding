import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

// setting up validations
const formSchema = yup.object().shape({
    name:yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(7,"Needs to be more that 7 characters").required('Where is the password?'),
    terms: yup.boolean().oneOf([true], "Agree to the terms or else")
})

//setting up the form states
function Form() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: '',
    })

//setting up state for errors
    const[errors, setErrors] = useState({
        name:'',
        email:'',
        password:'',
        terms:'',
    });
    
//setting state for button as disbaled
    const [buttonDisabled, setButtonDisabled] = useState(true);

// validating use effect
    useEffect(() =>{
    formSchema.isValid(formState).then(valid =>{
        setButtonDisabled(!valid);
    });
    }, [formState]);

//validating change
    const validateChange = e => {
        yup.reach(formSchema, e.target.name).validate(e.target.value).then(valid => 
        {setErrors({
        ...errors,
        [e.target.name]:''
        })
    })
    .catch(err => {
        setErrors({
            ...errors,
            [e.target.name]: err.errors
        })
    })
    }
    
    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
            <input
                    id='name'
                    type='text'
                    name='name'
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p>{errors.name}</p> :null}
            </label>
            <label htmlFor='email'>
                Email
            <input
                    id='email'
                    type='text'
                    name='email'
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? <p>{errors.email}</p> :null}
            </label>
            <label htmlFor='password'>
                Password
        <input
                    id='password'
                    type='text'
                    name='password'
                    value={formState.password}
                    onChange={inputChange}
                />
                {errors.password.length > 0 ? <p>{errors.password}</p> :null}
            </label>
            <label htmlFor='terms'>
                Terms
        <input
                    id='terms'
                    type='text'
                    name='terms'
                    value={formState.terms}
                    onChange={inputChange}
                />
                {errors.terms.length > 0 ? <p>{errors.terms}</p> :null}

            </label>


        </form>
    )
}
export default Form;


