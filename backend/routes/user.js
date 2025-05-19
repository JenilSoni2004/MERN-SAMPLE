const express=require("express")
const User = require("../Model/user")
const {handlealluser,getuserbyid,updateuser,deleteuser,handlecreatenewuser}=require('../Controller/user')
const router=express.Router() 

router.route("/")
.get(handlealluser)
.post(handlecreatenewuser);

router.route('/:id')
.get(getuserbyid)
.patch(updateuser)
.delete(deleteuser)


module.exports=router