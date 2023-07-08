const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const sticky = await db.Sticky.findByPk(req.params.id);
  sticky.content = req.body.content;
  await sticky.save();
  return res.json(sticky);
}));

module.exports = router;
