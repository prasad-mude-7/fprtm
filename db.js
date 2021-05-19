var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://prasad-admin:prasad14@cluster0.qlv8y.mongodb.net/IMAGEU',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(()=>{
    console.log("connection successfully")
  })
  .catch((err)=>{
    console.log(err)
  })