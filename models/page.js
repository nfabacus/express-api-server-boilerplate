const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
  url: { type: String, required: true, lowercase: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  subcontents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcontent' }]
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
