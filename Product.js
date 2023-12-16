// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  details: String,
  status: { type: String, default: 'pending' },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
