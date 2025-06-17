const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
