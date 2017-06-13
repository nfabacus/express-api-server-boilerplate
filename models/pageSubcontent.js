const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcontentSchema = new Schema({
  subtitle: { type: String, required: true },
  subcontent: { type: String, required: true },
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' }
});

const Subcontent = mongoose.model('Subcontent', SubcontentSchema);

module.exports = Subcontent;
