// dependencies
// ***************************************************
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//express-session 
var session = require('express-session');
// authentication middleware
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// sequelize
var Sequelize = require('sequelize');
var User = require('./models')['Users'];

var app = express();



//configure passport
app.use(passport.initialize());
app.use(passport.session());


//passport strategy must be configured
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},


function(username, password, done){
  User.find({ where: {email: username}})
    .then(function(user){
      if(!user)
        return done(null, false, {message: "User entered does not exist."});
      else if(!hashing.compare(password, user.password))
        return done(null, false, {message: "Incorrect Password."});
      else
        return done(null, user);
    });
}

));
// passport session
passport.serializeUser(function(user, done){
  done(null, user.id);
});
//passport session
passport.deserializeUser(function(id, done){
  User.find(id)
    .success(function(user){
      done(null, user);
    }).error(function(err){
        done(new Error('The user ' + id + 'does not exist.'));
    });   
});

// Serve static content for the app from the "public" directory in the app directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));
//methodoverride & handlebars
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

// Handlebars
app.set('view engine', 'handlebars');

var userRoutes = require('./controllers/userController.js');
app.use('/', userRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
