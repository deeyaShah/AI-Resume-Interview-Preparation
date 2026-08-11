const mongoose=require('mongoose')

const BlockListTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
},{timestamps:true})

const BlockListTokenModel=mongoose.model("blockListToken",BlockListTokenSchema);

module.exports=BlockListTokenModel;