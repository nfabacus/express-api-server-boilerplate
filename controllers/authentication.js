const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

// Function to create jwt token for user. 'sub' means 'subject' for the token. 'iat' means 'issued at' (time).
// You can send other information such as adminType, parent, studentType.
function createUserToken(user) {
  const timestamp = new Date().getTime();
  const payload = { sub: user.id, iat: timestamp, adminType: user.adminType, parent: user.parent, studentType: user.studentType };
  return jwt.encode(payload, config.secret);
}

exports.signup = function(req, res, next) {
  // const email = req.body.email;
  // const username = req.body.username;
  // const password = req.body.password;
  const email = req.sanitize('email').trim(); //trim any spaces before and after the value.
  const username = req.sanitize('username').trim(); //trim any spaces before and after the value.
  const password = req.sanitize('password').trim(); //trim any spaces before and after the value.
  const studentType = 0;
  const adminType = 0;
  const parent = true;

  req.checkBody({
   'email': {
      isEmail: {
        errorMessage: 'Please enter a valid email address.'
      }
    },
    'username':{
      isLength: {
        options: [{ min: 6, max: 15 }],
        errorMessage: 'Must be between 6 and 15 characters long.' // Error message for the validator, takes precedent over parameter message
      }
    },
    'password': {
      // notEmpty: true,
      isLength: {
        options: [{ min: 6, max: 30 }],
        errorMessage: 'Must be between 6 and 30 characters long.' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'Please enter a valid password.' // Error message for the parameter
    }
  });

  req.getValidationResult().then(function(result) {
    // If errors exist, then send the errors back.
    if(!result.isEmpty()) {
      return res.send({errors: result.array()});
    }
    // Check if a user with the username already exists
    User.findOne({ username: username }, function(err, existingUser){
      //In case it returns some error e.g. database connection error, return the error.
      if(err) { return next(err); }

      // If the user already exists, then return an error.
      if(existingUser) {
        return res.status(422).send({ error: 'This username is already taken. Please choose a different username.' });
      }

      // If a user with username does NOT exist, create and save user record
      const user = new User({
        email: email,
        username: username,
        password: password,
        adminType: adminType,
        parent: parent,
        studentType: studentType
      });

      user.save(function(err){
        if(err) { return next(err); }
        //Use CreateUserToken function at the top of this file. Create a User JWT token and send it back as a response.
        res.json({ token: createUserToken(user) });
        });
      });

  });
}

exports.signin = function(req, res, next) {
  // User has already had their username and password authenticated
  // so, got req.user.
  // We just need to give them a token.
  res.send({ token: createUserToken(req.user) });
}
