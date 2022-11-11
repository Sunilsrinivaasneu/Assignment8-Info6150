const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
{
productName: {required: true,minlength: 1,type:String},
productPrice: {required: true,minlength: 1,type:Number}
});

module.exports = productSchema;