const express=require('express')
const authController=require('../controllers/authController')
const router=express.Router()
const authMiddleware=require('../middlewares/authMiddleware')

router
.post('/register',authController.RegisterUser)
.post('/login',authController.loginUser)
.get('/logout',authController.logoutuser)
.get('/get-me',authMiddleware.authUser,authController.getMeController)

module.exports=router;