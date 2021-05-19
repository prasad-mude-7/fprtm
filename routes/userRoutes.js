

const router = require('express').Router();
const userController  = require("../controller/userController")

router.post('/addUser',userController.addUser);

router.post('/login',userController.login);

router.get('/getuser',userController.getuser);

router.get('/getinuser',userController.getinuser);

router.put('/updateuser',userController.updateuser);

module.exports = router;