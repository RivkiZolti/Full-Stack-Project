const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let router = express.Router()
function isFhoneNumber(phoneNumber) {
    var checkPhonenNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return checkPhonenNumber.test(phoneNumber);
}

const isEmail = (email) => {
    var checkEmail = /^\(?([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})$/;
    return checkEmail.test(email);
}
const isPassword = (password) => {
    var checkpassword = /^\(?([a-z0-9A-Z_.-]{8})\)?/;
    return checkpassword.test(password);
}



const isIsraeliID = id => /\d{9}/.test(id) && Array.from(id, Number).reduce((counter, digit, i) => {
    const step = digit * ((i % 2) + 1);
    return counter + (step > 9 ? step - 9 : step);
}) % 10 === 0;
const connectionString = "mongodb+srv://rivki:322667080@cluster0.50vpm.mongodb.net/project2?retryWrites=true&w=majority"
let db;
let orders;
MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected')
    db = client.db('project2')
    orders = db.collection('orders')

})

const sendMail = (userMail => {
    console.log("sent email1");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'serverrivki@gmail.com',
            pass: 'r322667080'
        }
    });

    console.log("sent email2");
    let mailOptions = {
        from: 'serverrivki@gmail.com',
        to: userMail ,
        subject: 'welcome  to Good Shoes' ,
        html: '<h3>Welcome  we are happy you joined us😃</h3>   </br>  <h2>enjoy your shopping</h2>'
    };
    console.log("sent email3");
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
        }
    });
    console.log("sent email4");
} )
router.get('/getAll', (req, res) => {
    console.log("eeeeeee");
    orders.find().toArray()
        .then(result => {
            res.send(result);
        })
        .catch(error => console.error(error))
});
router.post('/createOrder', (req, res) => {
    let result="";
    if (req.body.userName == undefined) {
  
        result+="userName requierd  \n  ";
    }
    if (req.body.id == undefined) {
     
        result+="id requierd   \n ";
    }
    if (req.body.password == undefined) {
      
        result+="password requierd    \n";
    }
    if (req.body.email == undefined) {
       
        result+="email requierd  \n  ";
    }
    if (req.body.phoneNumber == undefined) {
     
        result+="phone number requierd    \n ";
    }
    if (!isFhoneNumber(req.body.phoneNumber)) {
     
        result+="not valid phone number\n";
    }
    if (!isEmail(req.body.email)) {
      
        result+="not valid email \n";
    }
    if (!isIsraeliID(req.body.id)) {
      
        result+="not valid id    \n";
    }
    if (!isPassword(req.body.password)) {
    
        result+="not valid password    \n ";
    }
  
    if (req.body.userName.length < 2) {
       
        result+="userName need length more than 1 letter  \n  ";
    }
    if(result!=""){
        return res.send(result)
    }
    let newOrder = { ...req.body, cart: [] }
    
    orders.findOne({id:req.body.id})
    .then(user=>{
        if(user!=null){
            
            return res.send('The user already exists')
        }else{
            sendMail(req.body.email);
            orders.insertOne(newOrder)
            .then(res.send("ok"))
            .catch(err => { console.error(err); })
        }
    })
  
});








router.put('/updateOrder', (req, res) => {
    





    orders.findOneAndUpdate(
        { id: req.body.user },
        {
            $set: { cart:  req.body.cart }
        },
        {
            upsert: true
        }
    )
        .then(() => res.send("ok"))
        .catch(error => console.error(error))
})
router.get('/gett/:id', (req, res) => {
    console.log("rrrrrrrr"+req.params.id);

    orders.findOne({ id:req.params.id})
        .then(user => {
            console.log("jjjjjjjj"+user);
            if (user != null) {
                res.send(user)
            }
            else {
                res.send('not ')
            }
        })
        .catch(err => console.error(err))
})

router.post('/signIn', (req, res) => {
    console.log(req.body.id, req.body.password);
    orders.findOne({ id: req.body.id, password: req.body.password })
        .then(user => {
            console.log(user);
            if (user != null) {
                res.send(user)
            }
            else {
                res.send('not exist id with that password')
            }
        })
        .catch(err => console.error(err))
})
module.exports = router;
