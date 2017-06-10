const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// *** Define user model ****
// Inside the schema, set properties of the model, such as email, username,etc.
const userSchema = new Schema({
  email: { type: String, required: true, lowercase: true },
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  adminType: Number,
  parent: Boolean,
  studentType: Number
});
// e.g. admin, parent, student, studentType can be used to determine authorisation levels to access specific contents,etc.

// On Save Hook, encrypt password
// Before saving a model, run this pre.
userSchema.pre('save', function(next) { //When we try to save a model, this function will be run before saving it.
  // get access to this user model. Call it 'user'.
  const user = this;

  // generate ten rounds of salt(random string)
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }
    // Now, hash (encrypt) our password using the salt.
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) { return next(err); }

      //Overwrite plain text password with encrypted password
      user.password = hash;
      next(); //go ahead with saving the model
    });
  });
});


// adds method userSchema in order to compare passwords when logging in
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // candidatePassword is the password submitted by a user.
  // this.password is the user model's password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }
    //bcrypt automatically hashes the candidatePassword, and compare with the user's encrypted password.
    callback(null, isMatch);
  });
}


// *** Create the model class ***
const ModelClass = mongoose.model('user', userSchema);

// *** Export the model ***
module.exports = ModelClass;
