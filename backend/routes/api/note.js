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

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const noteId = req.params.id;
  const note = await db.Note.findByPk(noteId);
  console.log(note);
  if (note) {
    await note.destroy();
    res.status(200).json({ message: 'Delete successful.' });
  } else {
    res.status(400).json({ message: 'Unsuccessful' });
  };
}));

module.exports = router;
