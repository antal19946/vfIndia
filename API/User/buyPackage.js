const { levelDistribution } = require("../../Controller/commans/levelDistribution");
const { Transection } = require("../../Controller/commans/transection");
const EpinData = require("../../Modals/Pin");
const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const pin_details = require("../../Modals/pinDetails");
const plan = require("../../Modals/plan");
const userWallet = require("../../Modals/userWallet");

class buy {
    constructor() { }
    async activeDirect(sponsor_Id) {
        const active_direct = await UserData.find({ sponsor_Id, status: 1 }).count();
        const update_active_direct = await userWallet.findOneAndUpdate({ user_Id: sponsor_Id }, { 'active_direct.value': active_direct })
        // console.log(update_active_direct)
    }
    async topupWithPin(userSession, body) {
        const { package_name, user_Id } = body;

        const pinDetails = await pin_details.findOne({ 'pin_type.package_name': package_name, 'pin_type.status': 1 })
        if (pinDetails) {
            const num_of_available_pin = await EpinData.findOne({ user_Id: userSession, pin_type: package_name, is_used: 0, status: 1 });
            if (num_of_available_pin) {
                const user = await UserData.findOne({ user_Id });
                if (user) {
                    if (user.status == 0) {
                        const activateUser = await UserData.findOneAndUpdate({ user_Id, status: 0 }, { status: 1 ,Activation_date:new Date()});
                        this.activeDirect(activateUser.sponsor_Id)
                        const use_pin = await EpinData.findOneAndUpdate({ user_Id: num_of_available_pin.user_Id, pin: num_of_available_pin.pin }, { use_for_user_Id: activateUser.user_Id, is_used: 1 });
                        await levelDistribution.levelIncome(activateUser.user_Id, 100, pinDetails.pin_type.pin_rate,pinDetails)
                        return { status: true, activateUser };
                    } else {
                        return { status: false, message: "User already active" };
                    }
                } else {
                    return { status: false, message: "Invalid User" };
                }
            } else {
                return { status: false, message: "Insufficient Pin Balance" };
            }

        } else {
            return { status: false, message: "can't find this type of pin" }
        }

    }
    async topupWithFund(userSession, body) {
        const { package_name, user_Id, amount } = body;
        const packageDetails = await plan.findOne({ 'package_type.package_name': package_name });
        if (packageDetails) {
            const Wallet = await userWallet.findOne({ user_Id: userSession, 'fund_wallet.wallet_status': 1 });
            if (amount >= packageDetails.package_type.min_amount && amount <= packageDetails.package_type.mex_amount) {
                if (Wallet.fund_wallet.value >= amount) {
                    const user = await UserData.findOne({ user_Id });
                    if (user) {
                        if (user.status == 0) {
                            const activateUser = await UserData.findOneAndUpdate({ user_Id, status: 0 }, { status: 1,Activation_date:new Date() });
                            this.activeDirect(activateUser.sponsor_Id)
                            const use_fund = await userWallet.findOneAndUpdate({ user_Id: userSession }, { 'fund_wallet.value': Wallet.fund_wallet.value - amount });
                            Transection({
                                user_Id: userSession,
                                to_from: user_Id,
                                tx_type: "topup",
                                debit_credit: "debit",
                                source: null,
                                wallet_type: 'fund_wallet',
                                amount,
                                status: 1,
                                remark: `Debited ${amount} for topup ${user_Id}`
                            });

                            await levelDistribution.levelIncome(activateUser.user_Id, 100, amount, packageDetails)
                            return { status: true, activateUser };
                        } else {
                            return { status: false, message: "User already active" };
                        }
                    } else {
                        return { status: false, message: "Invalid User" };
                    }
                } else {
                    return { status: false, message: "Insufficient fund" };
                }
            } else {
                return { status: false, message: "Invalid amount" };
            }
        } else {
            return { status: false, message: "can't find this type of package" };
        }

    }
}
const Buy = new buy()
module.exports = { Buy }