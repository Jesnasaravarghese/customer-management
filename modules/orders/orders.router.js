const express = require('express');
var { createOrder, getAllOrders} = require('./orders.controller');

var router = express.Router();

var routes = () => {
    
    router.route("/")
        .post(createOrder);

    router.route("/")
        .get(getAllOrders);
    
    return router;
}

module.exports = { routes,path:'customers/:customer_id/order' };
