const UserData = require("../Modals/Users");
const advance_info = require("../Modals/advanceInfo");
const userWallet = require("../Modals/userWallet");
const { ePin } = require("../API/AdminAD/pin");
const plan = require("../Modals/plan");
const bcrypt = require("bcrypt");

class setup {
    constructor() {

    }
    async addFirstUser() {
        const user = new UserData({
            name: "demo",
            email: "demo@gmail.com",
            mobile: '1111111111',
            password: await hashPassword("test"),
            user_Id: "demo",
            status:1,
            sponsor_Id: "",
            joining_date: new Date()
        });
        const result = await user.save();
        const wallet = new userWallet({
            user_Id: result.user_Id
        })
        const savewallet = await wallet.save()
        return result;
    }
    async save_advance_info() {
        const advance = new advance_info()
        const isAdvanse = await advance_info.find().count()
        if (isAdvanse < 1) {
            await advance.save()
            return ({ isAdvanse })
        } else {
            return ({ isAdvanse, message: "advance info already saved" })
        }
    }
    async addDefaultPackage(){
        const body = {
            package_name:"welcome package",
            pin_rate:100                
           }
           const defaultPackage = await ePin.create_pin(body);
           return defaultPackage;
    }
    async savePlan(){
        const pla = new plan()
    const Plan = await pla.save()
    return Plan;
    }
}

const hashPassword = async (plaintextPassword) => {
    console.log("object", plaintextPassword);
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return await hash;
};

const projectSetup = new setup();
module.exports=projectSetup;