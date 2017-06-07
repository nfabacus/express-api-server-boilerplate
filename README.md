# Express API Server Boilerplate
  Express API server with mongoose, JWT authentication and authorisation  
### Install express, mongoose, morgan, body-parser
  npm install --save express mongoose morgan body-parser

### Setup index.js and Router
  Express
  http
  bodyParser
  mongoose

### Create models for mongoose
  For example, user.js

### Connect to mongoDB in index.js

### Create controllers to add to routes

### Add validation to user inputs
  1. Install express-validator
    npm install --save express-validator   
  2. Connect express-validator middleware to index.js   
    const expressValidator = require('express-validator'); //validator middleware for user inputs
    app.use(expressValidator()); // This line has to be just after app.use(bodyParser...).   
  3. 
