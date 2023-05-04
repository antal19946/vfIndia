const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const plan = require("../../Modals/plan");

class Pack{
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
        const pin_type = await plan.findOne({'package_type.package_name':body.package_name})
        const isUser = await UserData.findOne({user_Id:body.user_Id})
        if (pin_type) {
            if (isUser) {
                for(let i =0;i<body.num;i++){
                    try{
        
                        const ePin = new EpinData({
                            pin:this.generateString(10),
                            user_Id:body.user_Id,
                            created_by:'admin',
                            pin_type:body.package_name,
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
    async createPackage(body){
        try {
            const {package_name,min_amount,mex_amount} = body
            const advanceInfo = await advance_info.findOne()
            if (advanceInfo.Investment.topup_type.value == "pin") {
                const Pack = new plan({
                    package_type:{
                        package_name,
                        package_type:'pin',
                        min_amount,
                        mex_amount,
                        added_on:new Date()              
                       }
                    });
                    const e_pin = await Pack.save();
                    return {status:true,e_pin};
                } else {
                const Pack = new plan({
                    package_type:{
                        package_name,
                        package_type:'fund',
                        min_amount,
                        mex_amount,
                        added_on:new Date()              
                       }
                    });
                    const pack = await Pack.save();
                    return {status:true,pack};
            }
        } catch (error) {
            return {status:false,error};
        }
        
    }
}
const Package =new Pack();
module.exports ={Package}