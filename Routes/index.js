const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const { save_advance_info } = require("../API/AdminAD/advance");
const  {User}  = require("../API/User/user");
const { upload } = require("../controller/commans/UploadFile");
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
    const advance =await User.getProfile(Authorization_Token)
    res.json({advance})
})
router.post('/update_profile',upload.single('file'),async(req,res)=>{
    const Authorization_Token = await req.header("Authorization");
    let fileName = req?.file?.filename;
    let hostName = req.headers.host;
    const advance =await User.UpdateProfile(Authorization_Token,req.body,fileName,hostName)
    res.json({advance})
})
router.get('/test',async(req,res)=>{
    const advance =await User.test(req.body)
    res.json({advance})
})
module.exports = router;