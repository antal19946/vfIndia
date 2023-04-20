const EpinData = require("../../Modals/Pin");

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
        for(let i =0;i<body.num;i++){
            try{

                const ePin = new EpinData({
                    pin:this.generateString(10),
                    user_Id:body.user_Id,
                    created_by:'admin',
                    pin_type:body.pin_type,
                })
                console.log(ePin)
                const pin = await ePin.save();
                // return{status:true}
            }catch(e){
                return{status:false,e}
            }
        }
    }
}
const ePin =new Pin();
module.exports ={ePin}