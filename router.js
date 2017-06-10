const HelloWorld = require('./controllers/helloWorld'); //just an example of a controller.
const Authentication = require('./controllers/authentication');

const passportStrategies = require('./services/passport'); //import passport strategies and make them available.
const passport = require('passport'); //import this so that we can use passport.authenticate below.
const requireJWTAuth = passport.authenticate('jwt', { session: false }); //tell passport to use the jwt strategy. Tell it not to use its cookie based session.

module.exports = function(app) {
  app.get('/', HelloWorld.sayHello);

  app.get('/test', requireJWTAuth, HelloWorld.sayHello);

  app.post('/signup', Authentication.signup);
}
