const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const BlockListTokenModel=require('../model/BlockListTokenModel')

//Get username,email,password from user
//and it is used to register a new user
async function RegisterUser(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username,email and password"
        })
    }

    //check if user already exist or not
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Username or email already exist"
        })
    }

    //make hash of password 
    const hash = await bcrypt.hash(password, 10)

    //then create a new user
    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    //then generate a jwt token for user to identify,but not send on frontend
    const token = jwt.sign({
        id: user._id, username: user.username
    },
        process.env.JWT_SECERT,
        { expiresIn: "1d" }
    )

    //we parse this toke into cookie and send this cookie to frontend for user identification
    res.cookie("token", token)

    res.status(201).json({
        message: "User Registred Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id, username: user.username
    },
        process.env.JWT_SECERT,
        { expiresIn: "1d" }
    )

    res.cookie("token",token)

    res.status(200).json({
        message:"User LoggedIn Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}

async function logoutuser(req,res){
    const token=req.cookies.token;

    if(token)
    {
        await BlockListTokenModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json("User Logged Out Successfully..")
}

async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

module.exports = {
    RegisterUser,
    loginUser,
    logoutuser,
    getMeController
}