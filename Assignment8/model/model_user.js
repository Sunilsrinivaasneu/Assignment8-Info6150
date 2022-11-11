const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let product=require('./model_product');


const userSchema = new Schema(
{
  email: { type: String, required: true,unique: true,trim: true,minlength: 4},
password:{ type: String, required: true,unique: false,trim: true,minlength: 8},
products:{type:[product]}
}
);

userSchema.path('email').validate((val) => {
    emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(val);
}, 'Invalid e-mail, please enter a valid email');

userSchema.path('password').validate((val) => 
{
regex_pass=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
return regex_pass.test(val);
},'Password must have alteast 1 captial,1 small,1 number,1 symbol and should be atleast 8 chars long');

  
const User = mongoose.model('User', userSchema);

module.exports = User;