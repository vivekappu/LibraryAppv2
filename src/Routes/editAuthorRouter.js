const express = require("express");
const fs = require("fs");
const path = require("path");
const editAuthorRouter = express.Router();
const { nav } = require("../../nav");
const {authordb}=require("../model/database");
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
editAuthorRouter.get("/:id", function (req, res) {
    const id = req.params.id;
    console.log(id)
    authordb.findById(id)
    .then(
        function(author){res.render("editauthor", {
          nav,
          active:"authors",
          author: author
        });
      }
      ).catch(e=>console.log(e))
  
});
editAuthorRouter.get("/:id/delete",checkAuth,function(req,res){
    const id=req.params.id;
   authordb.findByIdAndDelete(id,function (err, docs) { 
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
          message:"Author deleted !!",
          redirect:true
        }
      ) 
    } 
    });
   
})
editAuthorRouter.post("/:id",checkAuth,function (req, res) {
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
   authordb.findOneAndUpdate(query,newData, {upsert: true}, function(err, doc) {
    if (err) return res.status(500).send( {error: err});
    return res.status(201).json(
      {
        message:"Author updated !!",
        redirect:true
      }
    )
   });
   
  });


  
},checkAuth);

exports.editAuthorRouter = editAuthorRouter;
