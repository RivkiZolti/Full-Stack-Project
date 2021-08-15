import React from 'react'
import { Link } from 'react-router-dom';
import './Toolbar.css';
export default function ToolBar() {
    return (
        <div className= "n">

            <nav className="navbar navbar-expand-lg navbar-light bg-light ">

                <div className="row">
                    <div className="col">
                 
                    </div>
                </div>
              
                

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link to="/home">home</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/girls">girl</Link>
                        </li>
                       
                        <li className="nav-item active">
                            <Link to="/boys">boy</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/womens">women</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/mens">men</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/SignUp">SignUp</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signin">sign in</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Signout">sign out</Link>
                        </li>
                      
                        <li className="nav-item">
                            <Link to="/cart">cart</Link>
                        </li>
                        
                    </ul>
      
                </div>
            </nav>

        
            
            
        </div>
    )
}
