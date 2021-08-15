import './App.css';
import Home from './component/Home'
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ToolBar from './component/toolbar/Toolbar'
import Product from './component/Product'
import SignUp from './component/SignUp.js'
import Payment from './component/Payment'
import Cart from './component/Cart'
import SIGN from './component/Signin'
import SIGNOUT from './component/Signout'
import react, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
export default function App(props) {
    let history = useHistory();
    const [isUserIn, setIsUserIn] = useState(false);
    const [isInCart, setInCart] = useState(false);
    // const gotopay2 = () => {
    //     history.push('/SignUp')
    // }
    // function signout(){
    //     localStorage.id="null";
    //     setIsUserIn(false);
    //     alert("You've sign out in successfully")
    //     // setIsUserIn=>{(boo)=>setIsUserIn(boo)};
    // }
    return (
        <div>
            <Router>
                <ToolBar></ToolBar>
                <div className="fo2" >
                    <h1>wellcome to</h1>
                </div>
                <div className="fo" >
                    <h1>goodshoes</h1>
                </div>
                {/* <button className="button" onClick={signout}>sign out</button> */}
                {/* <button className="btn1" onClick={() => {  gotopay2(); }}>payment</button> */}
               
                <Switch>
                      {/* {!isUserIn && <Route path="/cart">
                      <Login setIsUserIn={(bool)=>setIsUserIn(bool)} />

                    </Route>} */}

                    {/* /* {isUserIn && <Route path="/cart">
                        <Cart setInCart={(e)=>setInCart(e)} />

                    </Route>
                    {!isUserIn && <Route path="/cart" isUserIn={isUserIn}>
                        <Login setIsUserIn={(bool)=>setIsUserIn(bool)}/>

                    </Route>} */} 

                    <Route path="/home">
                        <Home />
                    </Route>

                    <Route path="/signin">
                        <SIGN setIsUserIn={(bool)=>setIsUserIn(bool)} />
                    </Route>
                    <Route path="/signout">
                        <SIGNOUT setIsUserIn={(boo)=>setIsUserIn(boo)} />
                    </Route>
                    <Route path='/cart' render={(props) => (<Cart {...props}  isUserIn={isUserIn}  setInCart={(e)=>setInCart(e)}/>)} />
                    <Route path='/payment' render={(props) => (<Payment {...props}  isInCart={isInCart}/>)} />
                    <Route path='/mens' render={(props) => (<Product {...props} title="men" isUserIn={isUserIn} />)} />
                    <Route path='/girls' render={(props) => (<Product {...props} title="girl" isUserIn={isUserIn} />)} />
                    <Route path='/boys' render={(props) => (<Product {...props} title="boy" isUserIn={isUserIn} />)} />
                    <Route path='/womens' render={(props) => (<Product {...props} title="women" isUserIn={isUserIn} />)} />
                    <Route path="/SignUp" render ={(props)=>  (<SignUp {...props} setIsUserIn={(bool)=>setIsUserIn(bool)} />)}/>
                    
                    

                    <Route path="/">
                        <Home />
                    </Route>


                </Switch>
            </Router>

        </div>
    )
}

// export default App;
