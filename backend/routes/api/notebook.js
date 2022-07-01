const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models');

const validateNotebook = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name cannot be longer than 50 characters.'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('You must enter a name for this notebook.'),
  handleValidationErrors
]

router.get('/users/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  // console.log('userId:: ', userId)
  const notebooks = await db.Notebook.findAll({
    where: { userId: userId },
    include: ['notes']
  });
  return res.json(notebooks);
}));

router.post('/users/:id(\\d+)', validateNotebook, asyncHandler(async (req, res) => {
  const userId = req.params.id
  const { name } = req.body;
  const notebook = await db.Notebook.create({
    name,
    userId: userId
  });
  return res.json(notebook)
}));

router.put('/:id(\\d+)', validateNotebook, asyncHandler(async (req, res) => {
  const notebook = await db.Notebook.findByPk(req.params.id);
  notebook.name = req.body.name;
  await notebook.save();
  res.json({ message: "Success" });
}));

router.delete('/:id(\\d+)', asyncHandler(async (req, res) => {
  const notebookId = req.params.id;
  const notebook = await db.Notebook.findByPk(notebookId);
  if (notebook) {
    await db.Note.destroy({ where: { notebookId: notebookId } });
    await notebook.destroy();
    res.status(200).json(notebook);
  } else {
    res.status(400).json({ message: 'Unsuccessful' });
  }
}));

module.exports = router;
