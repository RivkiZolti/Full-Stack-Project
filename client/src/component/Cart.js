import React, { useState, useEffect } from 'react'

import Zoom from 'react-medium-image-zoom'
import { useHistory } from "react-router-dom";
import { editUser } from './Function'
export default function Cart(props) {
    const [user, setuser] = useState([]);
    const [item1, setitem1] = useState([]);
    const [user2, setuser2] = useState([]);
    const [clickedItem, setclickedItem] = useState('')
    const [clickedprice, setclickedprice] = useState('')
    const [inindex, setinindex] = useState('')
    const [decrease, setdecrease] = useState(false);
    const [add, setadd] = useState(false);
    const [w, setw] = useState(false);
    const [deletei, setdeletei] = useState(false);
    const [cartSum, setCartSum] = useState(0);




    let history = useHistory();

    const gotopay2 = (price) => {
        history.push({
            pathname: '/payment',
            state: { cartSum: price }
        })
    }
    const gotopay1 = (sum) => {
        setCartSum(sum)
    }

    useEffect(() => {
        if (!props.isUserIn) {
            history.push('/SignUp')
           
            alert("To view your cart you must register  or log in first")
            
        }
        // if(!props.isInCart){
        //     history.push('/cart')
        // }
        gotopay1(cartSum);


    }, [user])


    async function editUser2(user,cart) {
        await fetch("http://localhost:27017/orders/updateOrder", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user:user,cart:cart}),
        });
    }
    async function getData2 (id) {
        await fetch("http://localhost:27017/orders/gett/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) =>
                response.json())
            .then(async(messages) => {
                await setuser(messages.cart)
                console.log(messages);
            })

    }

    useEffect(async () => {
        await getData2();
    })

    function getData1() {
        fetch("http://localhost:27017/orders/getAll", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) =>
                response.json())
            .then(async(messages) => {
               await setuser2(messages)
               console.log("messages: "+messages[0].cart);
            })

    }

    useEffect(() => {

        if (!props.isUserIn) {
            history.push('/SignUp')
            // alert("To view your cart you must register  or log in first")
        }
        // if(!props.isInCart){
        //     history.push('/cart')
        // }
        getData1();


    }, [])
    useEffect(() => {
        if (!props.isUserIn) {
            history.push('/SignUp')
            // alert("To view your cart you must register  or log in first")
        }
        // if(!props.isInCart){
        //     history.push('/cart')
        // }
        getData2(localStorage.id);
        // addcart(userID,arr["cart"]);
       


    }, [item1])

    const plus = (userId, itemID, price) => {
        let arr = user2.find(obj => {
            return obj.id === userId
        })

        arr["cart"].forEach(item => {
            if (item.id === itemID) {
                item.sum += 1;
                item.price = price


            }
        })
        // editUser(userId, arr);
        editUser2(userId,arr["cart"]);
        setadd(false)
    }
    const minus = (index, userId, itemID) => {
        let arr = user2.find(obj => {
            return obj.id === userId
        })
        arr["cart"].forEach(item => {
            if (item.id === itemID) {
                if (item.sum > 1) {
                    item.sum -= 1;

                } else {
                    arr["cart"].splice(index, 1);
                    // editUser(userId, arr);
                    editUser2(userId,arr["cart"]);


                }
            }
        })
        // editUser(userId, arr);
        editUser2(userId,arr["cart"]);
        setdecrease(false)
    }

    const deleteitem = (index, userId, itemID) => {
        let arr = user2.find(obj => {
            return obj.id === userId
        })
        arr["cart"].forEach(item => {
            if (item.id === itemID) {

                arr["cart"].splice(index, 1);
                editUser2(userId, arr["cart"]);


            }
        })
        // editUser(userId, arr);
        setdeletei(false)
    }

    useEffect(() => {
        if (!props.isUserIn) {
            history.push('/SignUp')
            // alert("To view your cart you must register  or log in first")
        }
        // if(!props.isInCart){
        //     history.push('/cart')
        // }
        if (add) {
            plus(localStorage.id, clickedItem, clickedprice);
            getData2(localStorage.id);
        }
    }, [add])
    useEffect(() => {
        if (!props.isUserIn) {
            history.push('/SignUp')
            // alert("To view your cart you must register  or log in first")
        }
        // if(!props.isInCart){
        //     history.push('/cart')
        // }
        if (decrease) {
            minus(inindex, localStorage.id, clickedItem, clickedprice);
            getData2(localStorage.id);
        }
    }, [decrease])
    useEffect(() => {
        if (!props.isUserIn) {
            history.push('/SignUp')
            // alert("To view your cart you must register  or log in first")
        }
        // if(!props.isInCart){
        //     history.push('/cart')
        // }
        if (deletei) {
            deleteitem(inindex, localStorage.id, clickedItem, clickedprice);
            getData2(localStorage.id);
        }
    }, [deletei])
    if (localStorage.degele == 1) {

    }
    return (
        <div>

            <div className="word" >shoping cart
          </div>

            <div className="grid-container">

                {user.map((item, index) => {
                    let image = require('./../asset/image/' + item.pic)
                    return (

                        <div className="pi" >

                            <Zoom>
                                <img src={image.default} />
                            </Zoom>


                            <div >price: {item.price}</div>

                            <div >sum:{item.sum}</div>
                            <div >size:{item.size}</div>
                            

                            <button className="btn1" onClick={() => { gotopay1(); gotopay2(item.price * item.sum); }}>payment</button>

                            <button className="button" onClick={() => { setadd(true); setclickedItem(item.id); setitem1(item1 + 1); setclickedprice(item.price); }}>+</button>
                            <button className="button" onClick={() => { setdecrease(true); setclickedItem(item.id); setinindex(index); setitem1(item1 + 2); setclickedprice(item.price); }}>-</button>
                            <button className="button" onClick={() => { setdeletei(true); setclickedItem(item.id); setinindex(index); setitem1(item1 + 4); }}>delete</button>

                        </div>



                    )
                })
                }
            </div>
        </div >

    )
}