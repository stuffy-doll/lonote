const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./user.js');
const notebooksRouter = require('./notebook.js');
const notesRouter = require('./note.js');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/notebooks', notebooksRouter);
router.use('/notes', notesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
