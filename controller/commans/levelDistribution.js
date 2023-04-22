const { User } = require("../../API/User/user");
const UserData = require("../../Modals/Users");
const plan = require("../../Modals/plan");
const userWallet = require("../../Modals/userWallet");

class Distribution {
  constructor() {}
  async levelIncome(user_Id, level, packageAmount) {
    const user = await User.getProfile(user_Id);
    var sponsor = user.sponsor_Id;
    const Plans = await plan.findOne();
    for (let index = 1; index <= level; index++) {
      const spo = await UserData.findOne({ user_Id: sponsor });
      const level = `level_${index}`;
      if (spo.length < 1 || Plans.level_income[level]<=0 || !Plans.level_income[level]) {
        break;
      }
      const wallet = await userWallet.findOne({ user_Id: spo.user_Id });
      if (index==1) {
        const count_in_main_wallet = wallet.direct_income.count_in_main_wallet;
          const inc =
            Plans.level_income.income_type.value === "percentage"
              ? packageAmount * (Plans.level_income[level] / 100)
              : Plans.level_income[level];
    
          if (count_in_main_wallet == 1) {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "main_wallet.value": wallet.main_wallet.value + inc,
                "direct_income.value": wallet.direct_income.value + inc,
              }
            );
            console.log(inc);
          } else {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              { "level_income.value": wallet.direct_income.value + inc }
            );
            console.log("test");
          }
          sponsor = spo.sponsor_Id;
      } else {
        
          const count_in_main_wallet = wallet.level_income.count_in_main_wallet;
          const inc =
            Plans.level_income.income_type.value === "percentage"
              ? packageAmount * (Plans.level_income[level] / 100)
              : Plans.level_income[level];
    
          if (count_in_main_wallet == 1) {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              {
                "main_wallet.value": wallet.main_wallet.value + inc,
                "level_income.value": wallet.level_income.value + inc,
              }
            );
            console.log(index,inc);
          } else {
            const update = await userWallet.findOneAndUpdate(
              { user_Id: wallet.user_Id },
              { "level_income.value": wallet.level_income.value + inc }
            );
            console.log("test");
          }
          sponsor = spo.sponsor_Id;
      }
    }
  }
}
const levelDistribution = new Distribution();
module.exports = { levelDistribution };
