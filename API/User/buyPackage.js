const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const pin_details = require("../../Modals/pinDetails");

class buy{
    constructor(){}
    async buyPackage(body){
        const {pin_type,user_Id} = body;
        const advance = await advance_info.findOne()
        if (advance.Investment.topup_type.value==="pin") {
            const pinDetails = await pin_details.findOne({'pin_type.package_name':pin_type,status:1})
            if (pinDetails) {
                const num_of_available_pin = await EpinData.findOne({user_Id,pin_type,is_used:0,status:1});
                if (num_of_available_pin,length>=1) {
                    const user = await UserData.findOne({user_Id,status:0});
                    if (user) {
                        const activateUser = await UserData.findOneAndUpdate({user_Id,status:0},{status:1});
                        const use_pin = await EpinData.findOneAndUpdate({user_Id:num_of_available_pin.user_Id,pin:num_of_available_pin.pin},{use_for_user_Id:activateUser.user_Id,is_used:1})
                    } else {
                        return {status:false,message:"Invalid User"}
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