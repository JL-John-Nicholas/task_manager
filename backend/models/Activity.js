const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String, // "created", "updated", "deleted"
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
