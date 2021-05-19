var mongoose = require('mongoose');



//what kind of fields will be there in collections
var imageSchema  = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  is_private: {
    type: Boolean
  },
  image: {
    type: String,
  },
  player : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  
},{ versionKey: false })
//mongoose.model('collection','schema)
mongoose.model('Image',imageSchema);
module.exports = mongoose.model('Image');

// export default Product