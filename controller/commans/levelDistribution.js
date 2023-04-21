const { User } = require("../../API/User/user");
const UserData = require("../../Modals/Users");
const userWallet = require("../../Modals/userWallet");

class Distribution{
    constructor(){

    }
    // async getUpline()
    async levelIncome(user_Id,level){
        const user = await User.getProfile(user_Id)
        var sponsor = user.sponsor_Id;
        for (let index = 1; index < level; index++) {
            const spo = await UserData.findOne({user_Id:sponsor})
            if (!spo) {
                break
            }
             const update = await userWallet.findOneAndUpdate({user_Id:spo.user_Id,},)
            console.log(spo)
            sponsor = spo.sponsor_Id
        }
    }
}
const levelDistribution =new Distribution();
module.exports={levelDistribution}