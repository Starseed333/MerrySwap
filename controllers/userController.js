//dependencies

var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');


var User = require('../models')['Users'];
var passport = require('passport');
// console.log(Event)

//index route
router.get('/', function (req, res){
  //asks login 
  res.render('index');
});

//SIGN UP
router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', function(req, res){
  //creates new user from valid form
  //if the email exists
  console.log(req.body);

   User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  });

   res.redirect('login');
});

//login
router.get('/login', function(req, res){
  res.render('login');
});


router.post('/login', function(req, res){
  console.log(req.body);

  User.findAll({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(function(data){
   
      if(data != ""){
        res.redirect('/manager');
      } else{
        //add message saying the password and user didn't match
        res.redirect('/login')
      }
  });

});






module.exports = router;
