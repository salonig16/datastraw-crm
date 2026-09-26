const mongoose = require('mongoose');

// Used to atomically generate sequential, human-friendly ticket IDs (TKT-001, TKT-002, ...)
// A simple countDocuments()+1 approach breaks once tickets are deleted or under
// concurrent requests; this counter document avoids both problems.
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
