const express = require('express');
const cors = require('cors');
const ejs = require('ejs');

const product_routes = require('./routes/product.routes');
const order_routes = require('./routes/order.routes');
const user_routes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use([
    product_routes,
    order_routes,
    user_routes
]);

module.exports = app;