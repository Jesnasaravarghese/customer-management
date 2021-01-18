const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    name:{
        type: String
    }
},{ collection: 'product' });

const Product = mongoose.model('Product', ProductSchema);
module.exports = { Product }


