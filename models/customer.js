const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = mongoose.Schema({
  email:{
    type: String
  },
  name:{
    type: String
  },
 	purchases: [{
    productId:{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    dateofPurchase:{
      type:Date,
      default: Date.now
    }
  }],
});

var Customer = mongoose.model('Customer', CustomerSchema);
module.exports = { Customer }
