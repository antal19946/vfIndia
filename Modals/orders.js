const mongoose = require('mongoose')
// const validator = require('validator')


const transectionSchema = new mongoose.Schema({
    user_Id:{
        type:String
    },
    order_Id:{
        type:String
    },
    tx_type:{
        type:String
    },
    package_name:{
        type:Number
    },
    order_amount:{
        type:Number
    },
    time:{
        type:String
    },
    status:{
        type:String
    },
    remark:{
        type:String
    },
    
})
const transection = new mongoose.model('transection', transectionSchema)
module.exports = transection;