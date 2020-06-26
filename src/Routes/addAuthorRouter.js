const express = require("express");
const fs = require("fs");
const path = require("path");
const addAuthorRouter = express.Router();
const { nav } = require("../../nav");
const {authordb }=require("../model/database");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
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
addAuthorRouter.get("/", function (req, res) {
  res.render("addauthor", {
    nav,
    title: "add New Author",
    active: "addauthor",
  });
});

addAuthorRouter.post("/",checkAuth, function (req, res) {
  
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }

    let data = {
      author: req.body.author,
      books: req.body.books,
      genre: req.body.genre,
      description: req.body.description,
      img: req.file.originalname,
    };
    console.log(data);
    //save book in db
    authordb(data).save().then(
      ()=>{ 
        return res.status(201).json(
          {
            message:"Added succesfully to database",
            redirect:true
          }
        )
  
        }
    ).catch(e=>console.log(e));
  });
});

exports.addAuthorRouter = addAuthorRouter;
