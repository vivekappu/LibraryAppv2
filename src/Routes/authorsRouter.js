const express = require("express");
const authorsRouter = express.Router();
const { nav } = require("../../nav");
const {authordb}=require("../model/database")


authorsRouter.get("/", function (req, res) {
  authordb.find()
  .then((authors)=>{
    res.render("authors", {
      nav,
      title: "Library",
      active: "authors",
      authors,
    });
  })
  .catch(e=>console.log(e))
  
});
authorsRouter.get("/:id", function (req, res) {
  const id = req.params.id;
  authordb.findById(id)
  .then(
    function(author){res.render("author", {
      nav,
      active: "authors",
      author: author
    });
  }
  ).catch(e=>console.log(e))
 
});

exports.authorsRouter = authorsRouter;
