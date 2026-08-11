const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username already exist"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true,"Account already exist with this email address"], 
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true 
    }
}, { timestamps: true });

const userModel=mongoose.model("users",userSchema);

module.exports=userModel