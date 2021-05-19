
const express = require('express');
const app = express();
const db = require('./db');
// const port = 5000;
const port = process.env.PORT || 7000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const session = require('express-session');



var sess = {
    secret: 'keyboard cat',
    cookie: {}
  }
///use session
app.use(session(sess));

// import productRouter from "./routes/productRoutes.js"


const userRouter = require('./routes/userRoutes');


const imageRouter = require('./routes/imageRoutes');


app.use('/image',imageRouter)

app.use('/user',userRouter)


app.get('/',(req,res)=>{
    res.json({status:200, msg:"Health Ok"})
})

app.get("*", (req, res) => {
    res.send("You've tried reaching a route that doesn't exist.")
  })



app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})