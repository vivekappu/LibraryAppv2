const express = require("express");
const fs = require("fs");
const path = require("path");
const addBookRouter = express.Router();
const { nav } = require("../../nav");
const {bookdb}=require("../model/database");
const multer = require("multer");
const checkAuth=require('../middleware/check-auth')

//var upload = multer({dest:path.join(__dirname,'../uploads')})
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).single("img");
addBookRouter.get("/", function (req, res) {
  res.render("addbook", {
    nav,
    title: "add New Book",
    active: "addbook",
  });
});

addBookRouter.post("/",checkAuth,function (req, res) {
  
  
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    console.log(req.body)
    let data = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      img:req.file.originalname
    };
    console.log(data);
    //save book in db
     bookdb(data).save().then(
     ()=>{ 
      return res.status(201).json(
        {
          message:"Added succesfully to database",
          redirect:true
        }
      )

      })
  });
});

exports.addBookRouter = addBookRouter;
