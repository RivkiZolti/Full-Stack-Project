import React from 'react'

export default function signout(props) {
    function signout(){
        localStorage.id="null";
        props.setIsUserIn(false);
        alert("You've sign out in successfully")
    }
  
    return (
        <div>
    
            <div className="word" > Thank you for visiting Good Shoes
          </div>
             <button className="button3" onClick={signout}>sign out</button>
     
        </div>
    )
}
