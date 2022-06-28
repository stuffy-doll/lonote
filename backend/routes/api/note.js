const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const db = require('../../db/models');

router.get('/users/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const notes = await db.Notebook.findAll({
    where: { userId: userId },
    include: ['notes']
  })
  console.log(req);
  console.log(notes);
  return res.json(notes);
}))

module.exports = router;
