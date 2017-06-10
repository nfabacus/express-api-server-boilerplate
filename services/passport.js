const passport = require('passport');
const User = require('../models/user');
const config = require('../config'); //to get secret.
const JwtStrategy = require('passport-jwt').Strategy; //import passport jwt strategy.
const ExtractJwt = require('passport-jwt').ExtractJwt; //Need this to extract a jwt token from request.
const LocalStrategy = require('passport-local');


// ********** Local Strategy to authenticate with username and password **********
// Create local strategy
const localOptions = { usernameField: 'username'} //Tell local strategy to use username for login (You can tell 'email' here instead of username if preferred.).
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {  // or you can pass email instead of username if you are using email for login instead.

  // do validation here if required for login..
  // if fails, return done({error:"failed Validation"}, false)
  // if success, just carry on.


  // Check if a user with the same username exists,
  User.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if(!user) { return done(null, false); }

    //If the user exists, then compare passwords - is the password input equal to this found user's password (user.password)?
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err); }
      if(!isMatch) { return done(null, false); }
      //if the passwords match, then return user with no error.
      return done(null, user);  //done callback is provided by passport.  It makes user available as req.user.
    });
  });
});

// ********** JWT Strategy to authenticate with JWT token **********
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
      done(null, user); //done callback is provided by passport.  It makes user available as req.user.
    } else { // Otherwise, call done with no error and false.
      done(null, false);
    }
  });
});

// ***** Connect the above strategies to passport *****
// However, you will still need to pass it in your routes (router.js)
passport.use(jwtLogin);
passport.use(localLogin);
