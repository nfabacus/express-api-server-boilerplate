//Main starting point of the server application
const express = require('express'); //Parse response + routing
const http = require('http'); //http module from node.js
const bodyParser = require('body-parser'); //Help parse incoming HTTP requests
const morgan = require('morgan'); //for logging
const expressValidator = require('express-validator'); //validator middleware for user inputs
const app = express();
const router = require('./router');


// *** DB Setup - connect mongoose to specific mongoDB ***
const mongoose = require('mongoose'); //ORM for mongoDB
mongoose.connect('mongodb://localhost/my-api-db');


// *** App Setup middlewares *** - morgan, cors, bodyParser are middlewares.
app.use(morgan('combined')); //morgan logs incoming requests, used for debugging. It shows you how requests are made,etc.
app.use(bodyParser.json({ type: '*/*' })); //parse incoming requests to json object (as req.body), to make it easy to handle.
app.use(expressValidator()); // This line has to be just after app.use(bodyParser...).
router(app); //pass app into router.


// *** Server Setup ***
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
