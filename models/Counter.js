const { Schema, model } = require('mongoose');

const schema = new Schema({
  sessionID: { type: Number, required: true, unique: true },
  count: { type: Number, required: true },
  last_update: { type: Date, default: Date.now },
});

// createdId - take if need from Object ID with method 'Types.ObjectId().getTimestamp()'

module.exports = model('Counter', schema);
