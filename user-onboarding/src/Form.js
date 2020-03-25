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
        terms: false
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

    const [response, setResponse] = useState();

// validating use effect
    useEffect(() =>{
    formSchema.isValid(formState).then(valid =>{
        setButtonDisabled(!valid);
    });
    }, [formState]);

//validating change
    const validateChange = (targetName,targetValue) => {
        yup.reach(formSchema,targetName).validate(targetValue).then(valid => 
        {setErrors({
        ...errors,
        [targetName]:''
        })
    })
    .catch(err => {
        setErrors({
            ...errors,
            [targetName]: err.errors
        })
    })
    }

    const formSubmit = e => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
        .then(res => {
            setResponse(res.data);
            console.log('success', response)

//clears the data
            setFormState({
                name:'',
                email: '',
                password:'',
                terms: false
            });
        })
        .catch(err =>{
            console.log(err.response);
        });
    };

    const inputChange = e => {
        e.persist();
        const targetName = e.target.name
        const targetValue = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const newFormData = {
            ...formState,
           [targetName]: targetValue
            
        };
        validateChange(targetName, targetValue);
        setFormState(newFormData);
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
                    type='checkbox'
                    name='terms'
                    checked={formState.terms}
                    onChange={inputChange}
                />
                {errors.terms.length > 0 ? <p>{errors.terms}</p> :null}

            </label>
            <button disabled={buttonDisabled}>Submit</button>


        </form>
    )
}
export default Form;


