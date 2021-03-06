const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PageSubcontentSchema = require('./pageSubcontentSchema');

const PageSchema = new Schema({
  url: { type: String, required: true, lowercase: true, unique: true },
  published: { type: Boolean, default: false },
  navLink: { type: Boolean, default: false },
  title: { type: String, required: [true, 'Title is required.'] },
  content: { type: String, required: true },
  subcontents: [PageSubcontentSchema]
});

const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
