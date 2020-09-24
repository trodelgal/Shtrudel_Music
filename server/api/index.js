const { Router } = require('express');

const router = Router();
function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}

router.use(logger);

router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/playlists', require('./playlists'));

module.exports = router;
