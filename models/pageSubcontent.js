const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcontentSchema = new Schema({
  subtitle: { type: String, required: true },
  subcontent: { type: String, required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }
});

const ModelClass = mongoose.model('Subcontent', subcontentSchema);

module.exports = ModelClass;
