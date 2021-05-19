const express = require('express');

const Image = require('../model/imageModel');



const cloudinary = require('cloudinary').v2;

const upload  = require ("../tmp/multer")

const User = require('../model/userModel');

const session = require('express-session');


require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });



exports.addImage =  async (req,res) =>{
    console.log(req.body)
    let { title, description,author, is_private } = req.body;
    console.log("<<>>",req.file)

    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
        console.log("<<>>rock<<>>",result)
      // Create new user
      let img = new Image({
        title: req.body.title,
        description: req.body.description,
        author:req.body.author,
        is_private:req.body.is_private,
        image: result.secure_url,
        player:await User.findOne({email:session.Store.email})
       
      });
      // Save user
      await img.save();
      res.json(img);
    } catch (err) {
      console.log(err);
    }
  
  
  };

//getAll image
exports.getImage = (req,res) => {
    Image.find({}). 
    populate('player','email').
    
        exec((err,data) => {
            if(err) return res.status(500).send(err)
            // data.map((item)=>{
               res.status(200).send(data)
            // })
            // res.status(200).send(data)
            // if(data.player.email === session.Store.email){res.status(200).send(data)}
        })
    }

    // getMY image
exports.getMImage = (req,res) => {
  Image.findOne({player:session.Store._id}). 
  populate('player','email').
  
      exec((err,data) => {
          if(err) return res.status(500).send(err)
          // data.map((item)=>{
             res.status(200).send(data)
          // })
          // res.status(200).send(data)
          // if(data.player.email === session.Store.email){res.status(200).send(data)}
      })
  }

// delete note
exports.dltImage = (req,res) => {
    // let Id = mongo.ObjectID(req.params.id);
    //findByAndDelete also works
    Image.findByIdAndRemove({ _id:req.params.id },(err,data) => {
        if(err) return res.status(500).send(err)
            res.status(200).send(data)
    })
}

exports.udtImage = (req,res) => {
  console.log(req.body)
  
  // let Id = mongo.ObjectID(req.params.id);
  //findByAndDelete also works
  Image.findByIdAndUpdate({ _id:req.params.id },req.body,(err,data) => {
      if(err) return res.status(500).send(err)
          res.status(200).send(data)
  })
}


// exports.getProductList = (req,res)=>{
//         Product.find({},
//             (err,data)=>{
//                 if(err) return res.status(500).send('Error')

//             res.status(200).json({data})
//             })
// }


// const Post = require("../model/postModel");
// const dotenv = require("dotenv")
// dotenv.config()
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
//   });


// const addPost = async (req, res) => {
//   let { title, description, is_private } = req.body;
//   let img=req.files.image
//   let { id } = req.user;


//   try {

//     cloudinary.uploader.upload(img.tempFilePath, async (err, result)=> { 
//       if(err) throw err;
//     const post = new Post({ title, description, image_by: id, is_private,image_url:result.url});
//     await post.save();
//       res.json({ message: "post created", post });
//     })
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getAllpost = async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     if (posts) {
//       res.json({ message: posts });
//     } else {
//       res.json({ message: "No Post Available" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "server issue" });
//   }
// };

// const getUserPosts = async (req, res) => {
//   const { id } = req.user;
//   try {
//     const posts = await Post.find({ image_by: id });
//     if (posts) {
//       res.json({ message: posts });
//     } else {
//       res.json({ message: "No Post Available" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "server issue" });
//   }
// };

// const updatePost = async (req, res) => {
//   let { title, description, is_private } = req.body;
//   let { id } = req.user;
//   let post_id = req.params.id;

//   try {
//       let post = await Post.findById(post_id);
//     if (post) {
//       post.title = title;
//       post.description = description;
//       post.is_private = is_private;
//       await post.save();
//     } else {
//       res.status(400).json({ message: "post not available" });
//     }
//     res.json({ message: "post updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const deletePost = async (req, res) => {
//     const id = req.params.id
//     try {
//         const post = await Post.findById(id)
//         await post.delete()
//         res.json({message:"deleted successfully"})
//     } catch (err) {
//         res.json({message:err.message})
//     }
// }
// module.exports = { addPost, getAllpost, getUserPosts, updatePost,deletePost };