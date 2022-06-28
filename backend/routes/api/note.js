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
}))

module.exports = router;
