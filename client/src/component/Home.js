import './Home.css';
import pic from '../asset/image/pictureboy/33.png'
import React from 'react';
import { useHistory } from "react-router-dom";

export default function Home(props) {
    let history = useHistory();
    // const gotopay2 = () => {
    //     localStorage.id="null";
    //     props.setIsUserIn(false);
    //     alert("You've sign out in successfully")
    // }
    // function signout(){
    //     localStorage.id="null";
    //     props.setIsUserIn(false);
    //     alert("You've sign out in successfully")
    // }
    return (
        <div>
      
         
     
        
           <img className="pcc" src={pic }  ></img> 
           {/* <button className="btn1" onClick={() => {  gotopay2(); }}>payment</button> */}
           {/* <button className="button" onClick={signout}>sign out</button> */}
           {/* <button className="btn1" onClick={() => {  gotopay2(); }}>payment</button> */}
        </div>
    )
}

