const express = require('express');


const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,         
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use('/orders',require('./orders.js'));
app.use('/product',require('./product.js'));
app.listen(27017, () => {
    console.log('server run');
});
