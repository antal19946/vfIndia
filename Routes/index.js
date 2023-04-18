const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const { save_advance_info } = require("../API/AdminAD/advance");
const  {User}  = require("../API/User/user");
const { upload } = require("../controller/commans/UploadFile");
const { Teams } = require("../API/User/getLevelTeam");
const { verifyToken } = require("../controller/commans/Auth");
var router = express.Router();
var jsonParser = bodyParser.json();
router.use(jsonParser)
router.get('/', (req, res) => {
    res.send("hello")
})
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
};

router.use(cors(corsOpts));
router.get('/save_advance_info',save_advance_info)
router.post('/register',async(req,res)=>{
    const advance =await User.register(req.body)
    res.json({advance})
})
router.post('/login',async(req,res)=>{
    const advance =await User.Login(req.body)
    res.json({advance})
})
router.post('/get_profile',async(req,res)=>{
    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const verification= await verifyToken(Authorization_Token);
        if(verification.status){
         const Profile = await User.getProfile(verification.resp.user_Id)
          res.json({status:true,Profile}); 
        }else{
         res.json({verification});
        }
       } else {
         res.json({ status: false, message: "Failed to authenticate token." });
       }
})
router.post('/update_profile',upload.single('file'),async(req,res)=>{
    const Authorization_Token = await req.header("Authorization");
    let fileName = req?.file?.filename;
    let hostName = req.headers.host;
    const advance =await User.UpdateProfile(Authorization_Token,req.body,fileName,hostName)
    res.json({advance})
})
router.get('/get_level_team',async(req,res)=>{

    const Authorization_Token = await req.header("Authorization");
    if (Authorization_Token) {
        const verification= await verifyToken(Authorization_Token);
        if(verification.status){
         const level_Team = await Teams.getLevelTeam(verification.resp.user_Id,req.body.level)
          res.json({status:true,level_Team}); 
        }else{
         res.json({verification});
        }
       } else {
         res.json({ status: false, message: "Failed to authenticate token." });
       }
    
})
router.get('/test',async(req,res)=>{
    const advance =await User.test(req.body)
    res.json({advance})
})
module.exports = router;