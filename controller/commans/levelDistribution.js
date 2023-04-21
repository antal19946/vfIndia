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
            const wallet = await userWallet.findOne({user_Id:spo.user_Id})
            const count_in_wallet = wallet.level_income.count_in_wallet;
            if (count_in_wallet!=null) {
                const wall = wallet[count_in_wallet]
                const update = await userWallet.findOneAndUpdate({user_Id:wallet.user_Id},{'[count_in_wallet].value':wallet[count_in_wallet].value+10,'level_income.value':wallet.level_income.value+10})
                console.log(wall.value)
            } else {
                console.log('test')
            }
            sponsor = spo.sponsor_Id
        }
    }
}
const levelDistribution =new Distribution();
module.exports={levelDistribution}