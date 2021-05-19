var mongoose = require('mongoose');

var validator = require('validator');

//what kind of fields will be there in collections
var userSchema  = new mongoose.Schema({
  first_name: {
    type: String,
    minlength: 3,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    minlength: 3,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: [true,"Email is already registered"],
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Please enter a valid Email !")
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    required: [true,"password require"],
    trim: true
  },
  phone:{
    type:Number
  },
  image:{
    type:String
  }
      
},{ versionKey: false })
//mongoose.model('collection','schema)
mongoose.model('User',userSchema);
module.exports = mongoose.model('User');

// export default Product