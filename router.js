const HelloWorld = require('./controllers/helloWorld'); //just an example of a controller.
const Authentication = require('./controllers/authentication');
const Permission = require('./controllers/permission');

const passportStrategies = require('./services/passport'); //import passport strategies and make them available.
const passport = require('passport'); //import this so that we can use passport.authenticate below.
const JWTAuth = passport.authenticate('jwt', { session: false }); //tells passport to use the jwt strategy. Tells it not to use its cookie based session.
const loginAuth = passport.authenticate('local', { session: false }); //tells passport to use the local strategy.  Tells it not to use its coolie based session.

module.exports = function(app) {
  app.get('/', HelloWorld.sayHello);
  app.get('/dashboard', JWTAuth, HelloWorld.sayHello); //JWTAuth will check token and user. If the token is okay, move to next (HelloWorld.sayHello).
  app.post('/signup', Authentication.signup); //check and create a user, and create and provide a new token for the user.
  app.post('/signin', loginAuth, Authentication.signin); //check username and password (loginAuth), and create and provide a new token(Authentication.signin) if username and password are correct.

  app.get('/admin', JWTAuth, Permission.confirmAdmin, function(req, res) {
    res.send({ message: "Welcome to the admin page!" });
  });

  app.get('/parent', JWTAuth, Permission.confirmParent, function(req, res, next) {
    res.send({ message: "Welcome to Parents page."});
  });

  app.get('/student', JWTAuth, function(req, res, next) {
    res.send({ message: "Welcome to Students page."});
  });
}
