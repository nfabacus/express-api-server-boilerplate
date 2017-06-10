# Express API Server Boilerplate
  Express API server with mongoose, JWT authentication and authorisation

### To run the dev server

* Make sure to start mongo database first
```
mongod
```
* Then, go and run api server.
```
npm run dev
```

## Steps to build the API server from scratch

### Install express, mongoose, morgan, body-parser
  npm install --save express mongoose morgan body-parser

### Setup index.js and add middlewares and Router to it
  Express
  http
  bodyParser
  mongoose - connect to mongoDB.

### Make sure to write a router file.
    router.js   

### Create controllers to add to routes

### Create models for mongoDB using mongoose
  For example, user.js

### Add validation to user inputs in your controller (e.g. authentication)
  1. Install express-validator
    npm install --save express-validator   
  2. Connect express-validator middleware to index.js   
    const expressValidator = require('express-validator'); //validator middleware for user inputs
    app.use(expressValidator()); // This line has to be just after app.use(bodyParser...).   
  3. Add validations to your controller (e.g.authentication.js).
  4. Do something to the database model (e.g. create and save data for user model in the database)

### Install bcrypt to encrypt user password
  1. Install bcrypt   
    npm install --save bcrypt-nodejs   
  2. In your model (e.g. user.js), you can generate salt and hash password together with the salt, before saving it to database. Set this up in user.js.

### JWT-token Setup
  1. Install jwt-simple   
    npm install --save jwt-simple   
  2. Create config.js file to hide your secret for jwt token.   
    *** Make sure to gitignore config.js!! ***   
  3. Require jwt and config into your controller (e.g. authentication.js)   
    const jwt = require('jwt-simple');   
    const config = require('../config');   

  4. Create and use a function to create a jwt token.
  e.g. authentication.js
  ```     
  // Function to create jwt token for user. 'sub' means 'subject' for the token. 'iat' means 'issued at' (time).
  // You can send other information such as adminType, parent, studentType.
  function createUserToken(user) {
    const timestamp = new Date().getTime();
    const payload = { sub: user.id, iat: timestamp, adminType: user.adminType, parent: user.parent, studentType: user.studentType };
    return jwt.encode(payload, config.secret);
  }
  ```   
  5. authentication.signup (authentication.js)   
    After user input valification, execute the 'createUserToken' function and send back the token.

### Installing Passport (authentication middleware for express js/node.js)
  1. install passport passport-jwt    
        npm install --save passport passport-jwt   

    * Passport is a authentication middleware for express js/node.js
    * passport-jwt is a passport strategy(library) which verifies user with a JWT.
    * You can have different strategies for authentication.
  2. Write strategies for Passport authentication middleware
    1) Create a folder called 'services', and create a file called passport.js in the folder.   
    2) In passport.js, write two strategies (the ways to authenticate users) and connect them to passport, so we can use it.
      Strategy 1: Signin -> Local Strategy: Verify Email and password -> Give token.
      Strategy 2: authenticated routes/requests -> JWT Strategy: Verify token -> Provide access
