const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models');

router.get('/users/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const notes = await db.Note.findAll({
    where: { userId: userId }
  })
  return res.json(notes);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { userId, notebookId, title, content } = req.body;
  const note = await db.Note.create({
    userId,
    notebookId,
    title,
    content
  });
  return res.json(note);
}));

module.exports = router;
