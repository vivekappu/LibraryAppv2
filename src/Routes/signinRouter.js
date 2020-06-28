const express = require("express");
const signinRouter = express.Router();
const { nav } = require("../../nav");
const { userdb } = require("../model/database");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
signinRouter.get("/", function (req, res) {
  res.render("signin", {
    nav,
    title: "Library",
    active: "signin",
  });
});
signinRouter.post("/",function(req,res){
  console.log(req.body.email)
  userdb.find({email:req.body.email}).exec()
  .then(
  user=>{
    if(user.length<1){
      return res.status(401).json(
        {
          message:"Auth failed user not present in database",
          
        }
      )
    }
    else{
      
      bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
          
          return res.status(401).json({
            message:"Auth failed"
          })
        }
        else if(result){
          
          const token=jwt.sign(
           { email:user[0].email,
             userId:user[0]._id,
             username:user[0].name
           },
           process.env.JWT_KEY,
          {
            expiresIn:"1hr"
          }
          )
          console.log("authsuccessful")
          return res.status(200).json({
           message:"Auth successful",
           redirect:true,
           token:token
         })
         
        }
        else{
          return res.status(401).json({
            message:"Auth failed wrong password"
          })
        }
      })
    }
  }
  )
  .catch(
    (err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  )
})
exports.signinRouter = signinRouter;
