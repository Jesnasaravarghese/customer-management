const _ = require('lodash');
const { Order } = require('./../../models/order');
const { Customer } = require('./../../models/customer');
const { Product  }= require('./../../models/product');

const createOrder = async (req,res) => {

    const body = _.pick(req.body, ['productName']);
    let orders = new Order(body);
    let productName = body.productName;
    try {
    const productDetails = await Product.find({name:productName});
    console.log(productDetails)
    if(productDetails){
    	orders.productId = productDetails._id;
      orders.customerId = req.params.id;

      const orderData = await Promise.all([
          orders.save(),
          updatePurchasesInfo(req,res,orderData._id,body.productDetails._id)
      ]);
    }
        
    res.status(200).send('Orders created successfully');    
	} catch(err) {
    console.log(err)
		res.status(400).send(err);
	}

}


const updatePurchasesInfo = async (req,res,orderId,productId) => {

	const customer = new Customer();

  const purchaseInfo = {
    orderId : orderId,
    productId: productId,
    dateofPurchase : new Date()
  };
  customer.purchases.push(purchaseInfo);

    return Customer.update(
        { _id: req.param.customer_id},
        {
          '$push': {
                  'purchases':purchaseInfo
            }
        }
    )
};

    
const getAllOrders = async (req, res) => {
   let query= {};  
   let startDate,endDate;
   console.log('hello000')
   if(req.query.start_date && req.query.end_date){
      startDate = new Date(req.query.start_date);
      endDate = new Date(req.query.end_date)
      let query = {
        createdDate: {
          $gte: startDate,
          $lte: endDate
        }
      };
   }
    try{
        const ordersList = await Order.find(query);
        return res.status(200).return(ordersList);
    }catch (err) {
        res.status(400).send(err);
    }

}           

          




module.exports = { createOrder,getAllOrders };