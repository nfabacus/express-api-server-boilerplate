const passport = require('passport');
const User = require('../models/user');
const config = require('../config'); //to get secret.
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// ********** JWT Strategy **********
// Setup for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), //Tells where to get jwt: Extract JWT from request's authorization header.
  secretOrKey: config.secret //Here provide secret so that it can encode jwt.
}

// Create JWT strategy
  // Payload is the JWT token found in the location (header) specified above and decoded with the secret in the jwtOptions above.
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // Payload is the JWT token found in the location (header) specified above and decoded with the secret in the jwtOptions above.

  // Check if the user ID in the payload exists in our database
  User.findById(payload.sub, function(err, user) {
    if(err) { return done(err, false); } // if it returns error, return done with the error and false.

    //If user exists, call done with no error (null) and the user object.
    if(user){
      done(null, user);
    } else { // Otherwise, call done with no error and false.
      done(null, false);
    }
  });
});

// ***** Connect the above strategies to passport. *****
// However, you will still need to pass it in your routes (router.js)
passport.use(jwtLogin);
