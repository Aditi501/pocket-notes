const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  body: { type: String, required: true },
  createdGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
