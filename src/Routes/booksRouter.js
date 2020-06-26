const express = require("express");
const booksRouter = express.Router();
const {bookdb}= require("../model/database");
const { nav } = require("../../nav");

booksRouter.get("/", function (req, res) {
  bookdb.find()
  .then((books)=>{
    res.render("books", {
      nav,
      title: "Library",
      active: "Books",
      books,
    });
  })
  .catch(e=>console.log(e))
  
});
booksRouter.get("/:id", function (req, res) {
  const id = req.params.id;
  bookdb.findById(id)
  .then(
    function(book){res.render("book", {
      nav,
      active: "Books",
      book: book
    });
  }
  ).catch(e=>console.log(e))
 
});

exports.booksRouter = booksRouter;
