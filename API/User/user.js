const UserData = require("../../Modals/Users");
const advance_info = require("../../Modals/advanceInfo");
const validator = require("email-validator");
class user{
  constructor() {
    this.advance = 'null';
    this.getAdvance();
  }
  async getAdvance(){
    const advanceInfo = await advance_info.findOne()
    this.advance =advanceInfo
  }
  async test(body){
    // this.advance = body
    return await this.generateUserName(body.userName);
  }
    async generateUserName(userName){
      const {user_gen_method,user_gen_prefix,user_gen_digit} = this.advance.Registration;
    if (userName) {
      if (user_gen_method.value === "automatic") {
       const number =
        Math.floor(
          Math.random() * ((10**(user_gen_digit.value)-1)- 10**(user_gen_digit.value-1) + 1) + 10**(user_gen_digit.value-1)
        );
        const userNmae = `${user_gen_prefix.value}${number}`;
        return ({status:true,userNmae});
      } else if (user_gen_method.value === "manual") {
        var alfanum = /^[0-9a-zA-Z]+$/;
        if (userName.match(alfanum)) {
          return userName;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };
  async isMobile(mobile){
    if(mobile>1000000000 && mobile<10000000000){
      const mobile_users =await UserData.find({mobile}).count()
      if(mobile_users<this.advance.Registration.mobile_users.value){
        return({status:true})
      }else{
        return({status:false,message:"Mobile number already exist"})
      }
    }else{
      return({status:false,message:"Please enter valid mobile number"})
    }
  }
  async isEmail(email){
    const isEmail = await validator.validate(email);
    if(isEmail){
      const email_users =await UserData.find({email}).count()
      if(email_users<this.advance.Registration.email_users.value){
        return({status:true})
      }else{
        return({status:false,message:"email ID already exist"})
      }
    }else{
      return({status:false,message:"Please enter valid email ID"})
    }
  }
   async generatePassword(password) {
    const {pass_gen_method,pass_gen_fun,pass_gen_digit} = this.advance.Registration;
    if (pass_gen_method.value === "automatic") {
      return generateString(pass_gen_digit.value);
    } else if (pass_gen_method.value === "manual") {
      if (pass_gen_fun.value === "basic") {
        if (password.length >= 4) {
          return ({status:true,password});
        } else {
          return ({status:false,message:"password should be minimum 4 characters"});
        }
      } else if (pass_gen_fun.value === "strong") {
        if (password.length === 8) {
          return ({status:true,password});
        } else {
          return ({status:false,message:"password should be minimum 8 characters"});
        }
      } else if (pass_gen_fun.value === "strongest") {
        const isStrong = await passwordStrength(password).value;
        if (isStrong === "Strong") {
          return ({status:true,password});
        } else {
          return ({status:false,message:"password must contain at least one uppercase character one lowercase character and one number"});
        }
      }
    }
  };
  async sponsor(sponsor_Id){
    const {is_sponsor_active_required} = this.advance.Registration;
    const sponsor_Data = await UserData.findOne({user_Id:sponsor_Id})
    if(sponsor_Data.count()===1){
      if(is_sponsor_active_required.value==="yes"){
        if(sponsor_Data.status== 1){
          return({status:true,sponsor_Id})
        }else{
          return({status:false,message:"sponsor not active"})
        }
      }else {
        return({status:true,sponsor_Id})
      }
    }else{
      return({status:false,message:"Invalid sponsor"})
    }

  }
  async register(body){
    const { name, email, mobile, password, user_Id, sponsor_Id } = body;
    const velidUserName = await this.generateUserName(user_Id);
      const isEmail = await this.isEmail(email);
      const isMobile = await this.isMobile(mobile);
      const sponsor_Data = await this.sponsor(sponsor_Id);
      const isexist = await UserData.findOne({ user_Id: velidUserName });
      const isStrongPassword = await this.generatePassword(password);
      const Error = await (!isMobile.status
        ? isMobile
        : !isEmail.status
        ? isEmail
        : !velidUserName
        ? { status: false, massage: "please enter valid username" }
        : !isStrongPassword.status
        ? isStrongPassword
        : isexist
        ? { status: false, massage: "username already exist" }
        : !sponsor_Data.status
        ? { status: false, massage: "sponsor id not exist" }
        : { status: true, massage: "registration success" });
      if (Error.status) {
        const user = new UserData({
          name,
          email,
          phone,
          password: await hashPassword(isStrongPassword),
          user_Id: velidUserName,
          sponsor_Id,
          sponsor_Name: sponsor_Data.name,
        });
        const result = await user.save();

  }
}
const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const User = new user();
    module.exports = {User};

