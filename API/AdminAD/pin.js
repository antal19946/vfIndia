const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const pin_details = require("../../Modals/pinDetails");

class Pin{
    constructor(){

    }
     generateString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
    async generatePin(body){
        const pin_type = await pin_details.find({'pin_type.package_name':body.pin_type})
        const isUser = await UserData.find({user_Id:body.user_Id})
        if (pin_type.length>0) {
            if (isUser.length>0) {
                for(let i =0;i<body.num;i++){
                    try{
        
                        const ePin = new EpinData({
                            pin:this.generateString(10),
                            user_Id:body.user_Id,
                            created_by:'admin',
                            pin_type:body.pin_type,
                            created_on:new Date()
                        })
                        console.log(ePin)
                        const pin = await ePin.save();
                        // return{status:true}
                    }catch(e){
                        return{status:false,e}
                    }
                }
                return {status:true}
            } else {
                return{status:false,message:"user not exist"}
            }
           
        } else {
            return{status:false,message:"this type of pin not available"}
        }
        
    }
    async create_pin(body){
        try {
            const pin = new pin_details({
                pin_type:{
                    package_name:body.package_name,
                    pin_rate:body.pin_rate                
                   }
            });
            const e_pin = await pin.save();
            return {status:true,e_pin};
        } catch (error) {
            return {status:false,error};
        }
        
    }
}
const ePin =new Pin();
module.exports ={ePin}