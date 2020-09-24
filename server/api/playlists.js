const { Router } = require('express');
const { Playlists } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allplaylists = await playlists.findAll();
  return res.json(allplaylists);
});
router.get('/:name', async (req, res) => {
  const allplaylists = await playlists.findAll();
  return res.json(allplaylists);
});
router.get('/:id/single', async (req, res) => {
  const allplaylists = await playlists.findAll();
  return res.json(allplaylists);
});
router.get('/top', async (req, res) => {
  const allplaylists = await playlists.findAll();
  return res.json(allplaylists);
});

// router.get('/:id', async (req, res) => {
//   const result = await Playlists_song.findAll({
//     attributes: [],
//     where: { playlist_id: req.params.id },
//     include: [{
//       model: Song,
//       attributes: ['title'],
//       include: [{
//         model: Artist,
//         attributes: ['name'],
//       },
//       {
//         model: Album,
//         attributes: ['name'],
//       },
//       ],
//     }],
//   });
//   res.json(result);
// });

module.exports = router;
