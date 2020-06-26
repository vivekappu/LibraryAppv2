const express = require("express");
const path = require("path");


const { nav } = require("./nav");
const { booksRouter } = require("./src/Routes/booksRouter");
const { authorsRouter } = require("./src/Routes/authorsRouter");
const { signinRouter } = require("./src/Routes/signinRouter");
const { signupRouter } = require("./src/Routes/signupRouter");
const { Router } = require("express");
const { addBookRouter } = require("./src/Routes/addBookRouter");
const { addAuthorRouter } = require("./src/Routes/addAuthorRouter");
const {editBookRouter}=require("./src/Routes/editBookRouter")
const {editAuthorRouter}=require("./src/Routes/editAuthorRouter")
const checkAuth=require('./src/middleware/check-auth')
const app = new express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/addbook",addBookRouter)
app.use("/addauthor",addAuthorRouter)
app.use("/editbook",editBookRouter);
app.use("/editauthor",editAuthorRouter)

app.get("/",function (req, res) {
 
  res.render("index", {
    nav,
    title: "Library",
    active: "Home"
  });
  
});
app.listen("5000");
