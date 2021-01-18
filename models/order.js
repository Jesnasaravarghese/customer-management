const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
  orderId : {
    type: String
  },
  productId:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  createdDate:{
    type:Date,
    default: Date.now
  }
});

var Order = mongoose.model('Order', OrderSchema);
module.exports = { Order }
