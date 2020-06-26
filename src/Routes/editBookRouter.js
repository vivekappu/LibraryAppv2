const express = require("express");
const fs = require("fs");
const path = require("path");
const editBookRouter = express.Router();
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
editBookRouter.get("/:id", function (req, res) {
    const id = req.params.id;
    bookdb.findById(id)
    .then(
        function(book){res.render("editbook", {
          nav,
          title:"edit New Book",
          active:"books",
          book: book
        });
      }
      ).catch(e=>console.log(e))
  
});
editBookRouter.get("/:id/delete",checkAuth,function(req,res){
 
    const id=req.params.id;
   bookdb.findByIdAndDelete(id,function (err, docs) { 
    if (err){ 
      return res.status(502).json(
        {
          message:"Failed to delete",
        }
      )
    } 
    else{ 
      return res.status(201).json(
        {
          message:"Book deleted !!",
          redirect:true
        }
      ) 
    } 
    });
   
})

editBookRouter.post("/:id",checkAuth,function (req, res) {
  const id=req.params.id;
  var query = {_id: id};
  upload(req, res, function (err) {
    if (err) {
      return res.status(409).json(
        {
          message:"Error uploading file",
        }
      )
    }
     
  let newData = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    img: req.file.originalname,
  };
   bookdb.findOneAndUpdate(query,newData, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
      return res.status(201).json(
        {
          message:"Your book is updated !!",
          redirect:true
        }
      )
  
   });
   
  });


  
});

exports.editBookRouter = editBookRouter;
