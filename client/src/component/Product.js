/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import { useHistory } from "react-router-dom";
import 'react-medium-image-zoom/dist/styles.css'
import './Design.css';
import { editUser } from './Function'
export default function Product(props) {
    
    let history = useHistory();

    // const[p,setp]=useState([]);
    const [type, setType] = useState();
    const [type2, setType2] = useState();
    const [products, setProducts] = useState([]);
    const [getItem, setgetItem] = useState('')
    const [getprice, setgetprice] = useState('')
    const [getPicture, setgetPicture] = useState('')
    const [user, setUser] = useState([]);
    const [productList, setProductList] = useState(products)
    const [sortitem, setSortitem] = useState(products)
    const [add, setAdd] = useState(false);
    const updateFormValues = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }
    const addItem = (userID, itemID, picID, priceID) => {
        if (!props.isUserIn) {
            history.push('/SignUp')
            
            alert("If you want to buy you need to register or log in")
            return;
        }
        let arr = user.find(obj => {
            console.log(userID);
            return obj.id === userID
           
        })

        let degel = 0;
  
        arr["cart"].forEach(item => {
            if (item.id === itemID) {
                item.sum += 1;
                item.pic = picID;
                item.price = priceID;
                degel = 1;
               
            }
        })
        if (!degel) {

            arr["cart"].push({
                id: itemID,
                sum: 1,
                pic: picID,
                price: priceID,
               

            })
        }
        // editUser(userID, arr);
        addcart(userID,arr["cart"]);
        setAdd(false)
    }
    useEffect(() => {
        if (add) {
            addItem(localStorage.id, getItem, getPicture, getprice);
        }
    }, [add])
    async function  getData() {
        await fetch("http://localhost:27017/product/getAlle", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) =>
                response.json())
            .then((messages) => {
                
                setProducts(messages[0][props.title])
            })
    }
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
                // console.log("hfhf",messages);
            })
          
    }
   async function addcart(user,cart){

     
       let response=await fetch("http://localhost:27017/orders/updateOrder", {
            method: 'PUT',
            headers: {
        
                'Content-Type': 'application/json'
                // 'Accept': 'application/json'
            },
            body:JSON.stringify( {user:user,
                cart:cart})
    })
    let response2 = await response.text()
    if (response2 === 'ok') {
        alert("You've add it to cart successfully")
        console.log("ok")
    }
    else {
        alert(response2)
        console.log("bad")

    }

     
  };
    useEffect(async () => {
        await getData();
        setType(props.title);
    }, [props.title])

 
    useEffect(() => {
        getData1();


    }, [])
    useEffect(() => {
        setSortitem();


    }, [sortitem])


  
   
    function high_to_low() {

        setSortitem(products.sort((b, a) => a.price - b.price))
    }
    function low_to_high() {

        setSortitem(products.sort((a, b) => a.price - b.price))
    }
    function defult() {
        setSortitem(products.sort((a, b) => a.id - b.id))

    }
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
        



    }
   
   

    return (
        <div>
            {/* <div className="word" > sort by:
          </div> */}
            <div className="text3">sort by:</div>
            <button className="button2" onClick={()=>{low_to_high()}}>low to high</button>
            <button className="button2" onClick={() =>{high_to_low()}}>high to low</button>
            <button className="button2" onClick={defult}>defult</button>
      
            



            <div className="grid-container">

                {products.map((item) => {
                   
                    let image = require('./../asset/image/' + item.picture)
                    return (
                        <div className="pi" >
                            <Zoom>

                                <img src={image.default} />
                            </Zoom>

                            <h5>{item.Shoe_description}</h5>

                  

                            {  <button className="button" onClick={() => { setAdd(true); setgetItem(item.id); setgetPicture(item.picture); setgetprice(item.price); }}>+</button>}

             
                        </div>

                    )
                })
                }

            </div>




        </div>
    )
}
