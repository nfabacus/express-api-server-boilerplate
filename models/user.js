const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

// *** Create the model class ***
const ModelClass = mongoose.model('user', userSchema);



// *** Export the model ***
module.exports = ModelClass;
