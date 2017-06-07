const HelloWorld = require('./controllers/helloWorld');
const Authentication = require('./controllers/authentication');

module.exports = function(app) {
  app.get('/', HelloWorld.sayHello);

  app.post('/signup', Authentication.signup);
}
