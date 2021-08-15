/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { validation } from './validation/Validation'
import './cerditcard/ToRegister.css';
import { useHistory } from "react-router-dom";
export default function ToRejister(props) {
    const [sign, setSign] = useState(false)
    const [user, setUser] = useState([])
    const [id, setId] = useState([])
    const [password, setPassword] = useState(false)
    const [localid, setLocalid] = useState(localStorage.id)
    const [ispassword, setIspassword] = useState(false)

    const [formValues, setFormValues] = useState({
        id: "", password: "", errors: {}
    })
    let history = useHistory();

    const updateFormValues = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }
    function g() {

        history.push("/login");


    }
    
    async function signIn() {
        console.log("kkkkkkkkkkkkkk");
        let newUser = {
            
              id: formValues.id,
              
              password:formValues.password
                
              
                 
         
            }
    let userDetails = await fetch('http://localhost:27017/orders/signIn', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    let response2 = await userDetails.text()
    if (response2 === 'not exist id with that password') {
        alert(response2)
        console.log("bad")
 
    }
    else {
        alert("You've signin in successfully")
        console.log("ok")

      
        localStorage.id = formValues.id
        props.setIsUserIn(true);
        setFormValues({ id: "",password: "", errors: {}})
    }
  };
    function getData1() {
        fetch("http://localhost:27017/orders/getAll", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) =>
                response.json())
            .then((messages) => {
                setUser(messages)
            })

    }
    useEffect(() => {
        getData1();


    }, [])
    const handleSubmit = (event) => {

        event.preventDefault();
        const errorsValue = validation(formValues)
        setFormValues({
            ...formValues,
            errors: errorsValue
        });
        var listEorrsEmpty;
        if (Object.keys(errorsValue) != "")
            listEorrsEmpty = 1;
        else {

            listEorrsEmpty = 0;
        }
        if (listEorrsEmpty == 0) {



        }


    }

    


    useEffect(() => {
        if (sign) {
            g();
        }
    }, [sign])

    return (


        <div class="container1">

            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>

            <form onSubmit={handleSubmit}>

                <div className='form-group'>
                    <label className='form-label' htmlFor="id-input">Please enter your id</label>
                    <input className="form-control"
                        onChange={updateFormValues}
                        value={formValues.id}
                        type="text"
                        name="id" />
                    {formValues.errors.id && <p>{formValues.errors.id}</p>}
                </div>
                <div className='form-group'>
                    <label className='form-label' htmlFor="password-input">Please enter your password</label>
                    <input className="form-control"
                        onChange={updateFormValues}
                        value={formValues.password}
                        type="password"
                        name="password" />
                    {formValues.errors.password && <p>{formValues.errors.password}</p>}
                </div>

                <button className="btn1" onClick={() => { signIn(); }}> Click when you're done finish</button>
           
                <h1>iIf you are not registered, go to login</h1>
                
                {password && <h1>The password does not match</h1>}

            </form>


        </div>

    )
}


