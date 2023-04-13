const express = require("express");
var bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const { save_advance_info } = require("../API/AdminAD/advance");
const  {User}  = require("../API/User/user");
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
// router.use(express.static(__dirname + '../uploads/'))
router.get('/save_advance_info',save_advance_info)
router.post('/register',async(req,res)=>{
    const advance =await User.register(req.body)
    res.json({advance})
})
router.get('/test',async(req,res)=>{
    const advance =await User.test(req.body)
    res.json({advance})
})
module.exports = router;