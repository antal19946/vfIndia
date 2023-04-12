const mongoose = require('mongoose')
// const validator = require('validator')


const advanceInfoSchema = new mongoose.Schema({
    Registration: {
        mobile_users:{
            title:{
                type:String,
                default:"Max Mobile Per Users"
            },
            value:{
                type:Number,
                default:1000
            }
        },
        email_users:{
            title:{
                type:String,
                default:"Max Email Per Users"
            },
            value:{
                type:Number,
                default:1000
            }
        },
        country_code:{
            title:{
                type:String,
                default:"Is required Country code"
            },
            options:{
                type:String,
                default:"yes,no"
            },
            value:{
                type:String,
                default:"no"
            }
        },
        user_gen_method:{
            title:{
                type:String,
                default:"UserName Generation Method"
            },
            options:{
                type:String,
                default:"automatic,manual"
            },
            value:{
                type:String,
                default:"automatic"
            }
        },
        user_gen_fun:{
            title:{
                type:String,
                default:"UserName Generation Function"
            },
            options:{
                type:String,
                default:"{alnum:Alpha-Numeric,numeric:Numeric Only}"
            },
            value:{
                type:String,
                default:"numeric"
            }
        },
        user_gen_digit:{
            title:{
                type:String,
                default:"UserName Generation Digit"
            },
            value:{
                type:Number,
                default:6
            }
        },
        user_gen_prefix:{
            title:{
                type:String,
                default:"UserName Generation Prefix"
            },
            value:{
                type:String,
                default:''
            }
        },
        pass_gen_method:{
            title:{
                type:String,
                default:"Password Generation Type"
            },
            options:{
                type:String,
                default:"automatic,manual"
            },
            value:{
                type:String,
                default:"manual"
            }
        },
        pass_gen_fun:{
            title:{
                type:String,
                default:"Password Generation Function"
            },
            options:{
                type:String,
                default:"basic,strong,strongest"
            },
            value:{
                type:String,
                default:"basic"
            }
        },
        pass_gen_digit:{
            title:{
                type:String,
                default:"Password Generation Digit"
            },
            value:{
                type:Number,
                default:6
            }
        },
        is_sponsor_active_required:{
            title:{
                type:String,
                default:"Is sponsor active required"
            },
            options:{
                type:String,
                default:"yes,no"
            },
            value:{
                type:String,
                default:"yes"
            }
        },
    },
   
   
})
const advance_info = new mongoose.model('advance_info', advanceInfoSchema)
module.exports = advance_info