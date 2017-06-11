const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  title: String,
  content: String,
  subcontents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcontent' }]
});

const ModelClass = mongoose.model('Page', pageSchema);

module.exports = ModelClass;
