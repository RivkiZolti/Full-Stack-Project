import React, { useState } from 'react';
import { FormLabel } from 'react-bootstrap'
import { validation } from './Cerditcard'
import './ToRegister.css';

export default function ToRejister() {
    const [formValues, setFormValues] = useState({
       cerditcard:"",year:"",month:"",id:"", errors: {}
    })

    const updateFormValues = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

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
            alert("Your request has been received, we will get back to you soon");
            setFormValues({ cerditcard:"",year:"",month:"",id:"", errors: {} })
        }
    }


    return (


            <div class="container1">
            
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
              
                <h3 className="title">Please fill in the details in order to register</h3>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="cerditcard-input">Please enter your cerditcard</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.cerditcard}
                            type="password"
                            name="cerditcard" />
                        {formValues.errors.cerditcard && <p>{formValues.errors.cerditcard}</p>}
                    </div>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="year-input">Please enter  year</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.year}
                            type="text"
                            name="year" />
                        {formValues.errors.year && <p>{formValues.errors.year}</p>}
                    </div>
                     <div className='form-group'>
                        <label className='form-label' htmlFor="month-input">Please enter month</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.month}
                            type="text"
                            name="month" />
                        {formValues.errors.month && <p>{formValues.errors.month}</p>}
                    </div>
                    { <div className='form-group'>
                        <label className='form-label' htmlFor="digit-input">Please enter digit</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.digit}
                            type="text"
                            name="digit" />
                        {formValues.errors.digit && <p>{formValues.errors.digit}</p>}
                    </div> }

                    { <div className='form-group'>
                        <label className='form-label' htmlFor="id-input">Please enter your id</label>
                        <input className="form-control"
                            onChange={updateFormValues}
                            value={formValues.id}
                            type="text"
                            name="id" />
                        {formValues.errors.digit && <p>{formValues.errors.digit}</p>}
                    </div> }
                    <button className="btn1">Click when you're done finish</button>
                   
                </form>
                
            </div>

    )
}


