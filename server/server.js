// server.js

var express = require('express');
var auth = require('./config/auth.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

// TODO setup connection to database

// passport middleware configuration
app.use(passport.initialize()); // ??
app.use(passport.session()); // ??

passport.use(new FacebookStrategy(auth.facebookAuth,
  function(accessToken, refreshToken, profile, cb) {
    // process.nextTick(function() {
    // });
      console.log('=====> accessToken: ', accessToken, '======>refreshToken:', refreshToken, '======>profile: ', profile, '======>cb: ', cb);
    // TODO find user in database
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   if (err) {
    //     console.log('err creating find/create user', err);
    //   } else {
        return cb(null, profile);
    //   }
    // });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// configure server with routes
require('./config/routes.js')(app, express);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});