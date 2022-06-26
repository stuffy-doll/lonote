const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');

router.get('/users/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const notebooks = await db.Notebook.findAll({
    where: { userId: userId },
    include: ['notes']
  });
  console.log(notebooks);
  return res.json(notebooks);
}));

module.exports = router;
