import React from 'react'
import Paypal from "./Paypal";
import Cerditcard from './cerditcard/ToRegister'
import './Design.css';
import react, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
export default function Cart(props) {
    let history = useHistory();
    
    const tota = props.location.state.cartSum;
   
    return (
        <div>
            <Paypal history={history} total={tota}/>
           
           <div className="text2">total: {tota}$</div>
            <Cerditcard/>
            
        </div>
    )
}




