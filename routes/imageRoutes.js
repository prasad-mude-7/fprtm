const router = require('express').Router();
const imageController  = require("../controller/imageController")
const fileupload= require('express-fileupload');
const express = require('express');
const app = express();
const upload  = require ("../tmp/multer")


// router.use(express.urlencoded({ extended: true }))
// router.use(fileupload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));


router.post('/addImage', upload.single("image"),imageController.addImage);

router.get('/getImage',imageController.getImage);

router.get('/getMImage',imageController.getMImage);

router.delete('/dltImage/:id',imageController.dltImage);


router.put('/udtImage/:id',imageController.udtImage);




module.exports = router;