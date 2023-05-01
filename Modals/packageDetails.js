const mongoose = require('mongoose')
const packageDetailSchema = new mongoose.Schema({
   package_type:{
    package_name:{
        type:String,
        default:"Starter"
    },
    min_amount:{
        type:Number,
        default:0
    },
    mex_amount:{
        type:Number,
        default:1e18
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
const package_details = new mongoose.model('package_details', packageDetailSchema)
module.exports = package_details;