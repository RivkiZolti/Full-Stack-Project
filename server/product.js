const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let router = express.Router()

const connectionString = "mongodb+srv://rivki:322667080@cluster0.50vpm.mongodb.net/project2?retryWrites=true&w=majority"
let db;
let product;
MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected')
    db = client.db('project2')
    
    product=db.collection('product')
})




router.get('/getProduct', (req, res) => {
    product.find().toArray()
        .then((product) => {
            if (product != undefined) {
                return res.send(product);
                    } else {
                        return res.end("eroor");
                    }
                }).catch(error => console.error(error))
});
router.get('/getAlle', (req, res) => {
    product.find().toArray()
        .then(result => {
            res.send(result);
        })
        .catch(error => console.error(error))
});


module.exports = router;
