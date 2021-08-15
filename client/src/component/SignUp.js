import React, { useState } from 'react';
import { validation } from './validation/Validation'
import './cerditcard/ToRegister.css';

export default function SignUp(props) {
   
    const [formValues, setFormValues] = useState({
        email: "", userName: "", phoneNumber: "", id: "",password: "", errors: {}
    })

    const updateFormValues = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }
  
   
const addUser = async ( email,userName,phoneNumber,id,password) => {
   
    props.setIsUserIn(true);
    let newUser = {
    userName:userName,
      id: id,
      email: email,
      phoneNumber:phoneNumber,
      password:password,
      cart: []
        
      
         
 
    }
    
  
    let response = await fetch('http://localhost:27017/orders/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    })
    let response2 = await response.text()
    if (response2 === 'ok') {
        alert("You've SignUp in successfully")
        console.log("ok")

      

    }
    else {
        alert(response2)
        console.log("bad")

    }

     
  };

    const handleSubmit = (event) => {
        console.log("s");
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
        
addUser(formValues.email,formValues.userName,  formValues.phoneNumber,formValues.id,formValues.password);

localStorage.id=formValues.id;
localStorage.password=formValues.password;
localStorage.email=formValues.email;
setFormValues({ email: "", userName: "", phoneNumber: "", id: "",password: "", errors: {} })

      
    }

   
     
    return (


            <div class="container1">
           
              
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
               
                <h3 className="title">Please fill in the details in order to register</h3>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="email-input">Please enter your email</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.email}
                            type="text"
                            name="email" />
                        {formValues.errors.email && <p>{formValues.errors.email}</p>}
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="userName-input">Please enter your userName</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.userName}
                            type="text"
                            name="userName" />
                        {formValues.errors.userName && <p>{formValues.errors.userName}</p>}
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="phoneNumber-input">Please enter your phoneNumber</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.phoneNumber}
                            type="text"
                            name="phoneNumber" />
                        {formValues.errors.phoneNumber && <p>{formValues.errors.phoneNumber}</p>}
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
                    <div className='form-group'>
                        <label className='form-label' htmlFor="id-input">Please enter your id</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.id}
                            type="text"
                            name="id" />
                        {formValues.errors.id && <p>{formValues.errors.id}</p>}
                    </div>
                   
                    <button className="btn1">Click when you're done finish</button>
                   
                 
                   
                </form>
            </div>

    )
}


