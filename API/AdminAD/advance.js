const advance_info = require("../../Modals/advanceInfo")

const save_advance_info = async(req,res)=>{
const advance = new advance_info()
const isAdvanse =await advance_info.find().count()
if(isAdvanse<1){
await advance.save()
res.status(201).json({isAdvanse})
}else{
    res.json({isAdvanse,message:"advance info already saved"})
}
}
module.exports = {save_advance_info}