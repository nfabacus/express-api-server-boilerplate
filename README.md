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
