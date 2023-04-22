const { levelDistribution } = require("../../Controller/commans/levelDistribution");
const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const pin_details = require("../../Modals/pinDetails");
const userWallet = require("../../Modals/userWallet");

class buy{
    constructor(){}
    async activeDirect(sponsor_Id){
        const active_direct = await UserData.find({sponsor_Id,status:1}).count();
        const update_active_direct =await userWallet.findOneAndUpdate({user_Id:sponsor_Id},{'active_direct.value':active_direct})
        console.log(update_active_direct)
    }
    async buyPackage(userSession,body){
        const {pin_type,user_Id} = body;
        const advance = await advance_info.findOne()
        if (advance.Investment.topup_type.value==="pin") {
            const pinDetails = await pin_details.findOne({'pin_type.package_name':pin_type,'pin_type.status':1})
            if (pinDetails) {
                const num_of_available_pin = await EpinData.findOne({user_Id:userSession,pin_type,is_used:0,status:1});
                if (num_of_available_pin) {
                    const user = await UserData.findOne({user_Id});
                    if (user) {
                        if (user.status==0) {
                            const activateUser = await UserData.findOneAndUpdate({user_Id,status:0},{status:1});
                           this.activeDirect(activateUser.sponsor_Id)
                            const use_pin = await EpinData.findOneAndUpdate({user_Id:num_of_available_pin.user_Id,pin:num_of_available_pin.pin},{use_for_user_Id:activateUser.user_Id,is_used:1});
                           await levelDistribution.levelIncome(activateUser.user_Id,100,pinDetails.pin_type.pin_rate)
                            return {status:true,activateUser};
                        } else {
                            return {status:false,message:"User already active"};
                        }
                    } else {
                        return {status:false,message:"Invalid User"};
                    }
                } else {
                    return {status:false,message:"Insufficient Pin Balance"};
                }

            } else {
                return {status:false,message:"can't find this type of pin"}
            }
        } else {
            
        }
    }
}
const Buy = new buy()
module.exports ={Buy}