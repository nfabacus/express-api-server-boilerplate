const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSubcontentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = PageSubcontentSchema;
