const express = require('express');

const jwt = require('jsonwebtoken');

const config = require('./config');

const User = require('../model/userModel');
const session = require('express-session');
 

console.log(Math.random())



exports.addUser = (req,res) =>{
    console.log(req.body)
    User.create({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        phone:Math.random(),
        image:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        
       
      
    },(err,data) => {
        if(err) return res.status(500).send(err)
        res.status(200).send(data)
    })
}

//login user
exports.login = (req,res) => {
    var user={
        email:req.body.email,
        password:req.body.password
    }
    User.findOne(user,
        (err,data) => {
            if(err || !data) {return res.status(500).send({auth:false,message:"invalid credentials ! Please Try Again"})}
            else{ 
                var token = jwt.sign({id:data._id},config.secert,{expiresIn:86400});
                session.Store = data;
                // console.log(req.session.sess.email)
                console.log("login>>>",session.Store)
            return res.send({auth:true,token:token,name:data.first_name,email:data.email,id:data._id})
            }
        })
    
    }

// get loggedin user data
exports.getinuser = (req,res) => {
    
    var token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send({auth:false, "error":'Invalid Token'})
        User.findById(data.id,{password:0},(err,result) => {
            if(err) return res.status(500).send(err)
            res.send(result)
        })
    })  


    }





// get all users
    exports.getuser = (req,res) => {
       
        User.find({},
            (err,data) => {
                if(err) return res.send(err)
                res.status(200).send(data)
            })
        
        }

exports.updateuser = (req,res) =>{
    var token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    jwt.verify(token,config.secert,(err,data) => {
        if(err) return res.status(500).send({auth:false, "error":'Invalid Token'})
        User.findByIdAndUpdate(data.id, {$set:{image:req.body.image}},(err,result) => {
            if(err) return res.status(500).send(err)
            res.send(result)
        })
    })  
}

// router.post('/register',(req,res)=>{
//     console.log(req.body)
//     User.create({
//         name:req.body.name,
//         sort: req.body.sort,
        
//     },(err,user) => {
//         if(err) return res.status(500).send('Error')
//         res.status(200).send("Register Success")
//     })
// })


// router.post("/update",(req,res)=>{
//     var hashpass =  bcrypt.hashSync(req.body.new_pass,8)
//     user_update = {
//         email:req.body.email,
//         old_pass:req.body.old_pass,
//         new_pass:req.body.new_pass
//     }
//     User.findOne({email:req.body.email},(err,data) => {
//         if(err) return res.status(500).send({auth:false, "error":'Error While login'})
//         if(!data) return res.status(500).send({auth:false, "error":'No user Found Register First'})
//         else{
//             const passIsValid = bcrypt.compareSync(req.body.old_pass,data.password)
//             if(!passIsValid) return res.status(500).send({"error":'Invalid Password'})
//             else{
//                 User.updateOne(
//                     {email:req.body.email},
//                     {
//                         $set:{
//                             password:hashpass
//                         }
//                     },(err,result) =>{
//                         if(err) throw err;
//                         res.send('password Updated')
//                     }
//                 )
//             }
//         }
//     })
    
// })
// //register
// // router.post('/register',(req,res)=>{
// //     var hashedpassword = bcrypt.hashSync(req.body.password,8);
// //     User.create({
// //         name:req.body.name,
// //         password:hashedpassword,
// //         email:req.body.emal,
// //         role:req.body.role?req.body.role:'user'
// //     },(err,user) => {
// //         if(err) { res.status(500).send('Error')}
// //         res.status(200).send("Register Success")
// //     })
// // })



// //loginUser
//  router.post('/login',(req,res) => {
//     User.findOne({email:req.body.email},(err,data) => {
//         if(err) return res.status(500).send({auth:false, "error":'Error While login'})
//         if(!data) return res.status(500).send({auth:false, "error":'No user Found Register First'})
//         else{
//             const passIsValid = bcrypt.compareSync(req.body.password,data.password)
//             if(!passIsValid) return res.status(500).send({"error":'Invalid Password'})

//             //here we are generating token
//             //userid,secert,expiretime
//             var token = jwt.sign({id:data._id},config.secert,{expiresIn:86400});
//             res.send({auth:true,token:token})
//         }
//     })
// });

// //profile
// router.get('/userInfo',(req,res) => {
//     var token = req.headers['x-access-token'];
//     if(!token) res.send({auth:false,token:'No Token Provided'})
//     jwt.verify(token,config.secert,(err,data) => {
//         if(err) return res.status(500).send({auth:false, "error":'Invalid Token'})
//         User.findById(data.id,{password:0},(err,result) => {
//             res.send(result)
//         })
//     })
// })




// module.exports = router;