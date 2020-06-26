const express = require("express");
const signupRouter = express.Router();
const { nav } = require("../../nav");
const { userdb } = require("../model/database");
const bcrypt = require("bcryptjs");

signupRouter.get("/", function (req, res) {
  res.render("signup", {
    nav,
    title: "Library",
    active: "signup",
  });
});

signupRouter.get("/", function (req, res) {
  res.render("signup", {
    nav,
    title: "Library",
    active: "signup",
  });
});
signupRouter.post("/", function (req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      console.log(req.body.email);
      userdb
        .find({ email: req.body.email })
        .exec()
        .then((user) => {
          console.log(user);
          if (user.length >= 1) {
            return res.status(409).json({
              message: "User with the same mail exists",
            });
          } else {
            var name = req.body.name;
            var email = req.body.email;
            var password = hash;
            var dob = req.body.dob;
            var country = req.body.country;
            var gender = req.body.gender;
            var data = {
              name: name,
              email: email,
              password: password,
              dob: dob,
              country: country,
              gender: gender,
            };
            console.log(data);
            userdb(data)
              .save()
              .then(() => {
                return res.status(200).json({
                  message: "Signup successful",
                  redirect:true
                });
               
              });
          }
        });
    }
  });
});

exports.signupRouter = signupRouter;
