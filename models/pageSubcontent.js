const mongoose = require('mongoose');
const Schema = monngoose.Schema;

const subcontentSchema = new Schema({
  subtitle: String,
  subcontent: String,
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }
});

const ModelClass = mongoose.model('Subcontent', pageSchema);

module.exports = ModelClass;
