const mongoose = require('mongoose')
// const validator = require('validator')


const pinDetailSchema = new mongoose.Schema({
   pin_type:{
    package_name:{
        type:String,
        default:null
    },
    pin_rate:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:1
    },
    added_on:{
        type:String,
        default:new Date()
    },
    updated_on:{
        type:String,
        default:null
    }
   }
})
const pin_details = new mongoose.model('pin_details', pinDetailSchema)
module.exports = pin_details;