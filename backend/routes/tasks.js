const router = require('express').Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const Comment = require('../models/Comment');
const Activity = require('../models/Activity');

// Get all tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ created_by: req.user });
  res.json(tasks);
});


// Create a new task
router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body, created_by: req.user });
  await task.save();

  await new Activity({
    task_id: task._id,
    user_id: req.user,
    action: 'created'
  }).save();

  res.json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await new Activity({
    task_id: task._id,
    user_id: req.user,
    action: 'updated'
  }).save();

  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);

  await new Activity({
    task_id: req.params.id,
    user_id: req.user,
    action: 'deleted'
  }).save();

  res.json({ msg: 'Task deleted' });
});

// Add comment to task
router.post('/:id/comments', auth, async (req, res) => {
  const comment = new Comment({
    task_id: req.params.id,
    user_id: req.user,
    text: req.body.text
  });
  await comment.save();
  res.json(comment);
});

// Get all comments for a task
router.get('/:id/comments', auth, async (req, res) => {
  const comments = await Comment.find({ task_id: req.params.id }).populate('user_id', 'username');
  res.json(comments);
});

// Get all activity logs for a task
router.get('/:id/activity', auth, async (req, res) => {
  const activities = await Activity.find({ task_id: req.params.id })
    .populate('user_id', 'username')
    .sort({ createdAt: -1 });
  res.json(activities);
});

module.exports = router;
