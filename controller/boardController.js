const express = require('express');

const Board = require('../model/boardModel');

const User = require('../model/userModel');

const session = require('express-session');



exports.addBoard = async (req,res) =>{
    const newGrade = {
        email:null
    }
    console.log(req.body)

    console.log("<<bhaubhaubhau",session.Store.email)
    Board.create({
        boardTitle:req.body.boardTitle,
        player:await User.findOne({email:session.Store.email})
        // invite:newGrade
        
    },(err,data) => {
        if(err) return res.status(500).send(err)
        session.MemoryStore = data
        res.status(200).send(data)
    })
}

//getAll Product
exports.getBoard = (req,res) => {
    Board.find({}). 
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
exports.dltBoard = (req,res) => {
    // let Id = mongo.ObjectID(req.params.id);
    //findByAndDelete also works
    Board.findByIdAndRemove({ _id:req.params.id },(err,data) => {
        if(err) return res.status(500).send(err)
            res.status(200).send(data)
    })
}

// udtBoard
exports.udtBoard = (req,res) => {
    const newGrade = {
        email:req.body.email
    }
    // let Id = mongo.ObjectID(req.params.id);
    //findByAndDelete also works
    Board.findOneAndUpdate({ player:req.body.id , boardTitle:req.body.boardT },{$push:{ invite:newGrade}},(err,data) => {
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
