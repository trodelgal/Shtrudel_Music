const { Router } = require('express');
const { searchElastic } = require("./elasticFunction");

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

router.get('/search/:search', async (req, res)=>{
  try{
    const artists = await searchElastic("artists", req.params.search);
    const albums = await searchElastic("albums", req.params.search);
    const songs = await searchElastic("songs", req.params.search);
    const playlists = await searchElastic("playlists", req.params.search);
    const results = [...artists.body.hits.hits, ...albums.body.hits.hits, ...songs.body.hits.hits,...playlists.body.hits.hits]
    res.json(results);
  }catch(err){
    res.json(err)
  }
})

module.exports = router;
