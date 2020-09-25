const { Router } = require('express');
const Sequelize = require('sequelize');
const { Playlists, Songs, Users } = require('../models');

const { Op } = Sequelize;

const router = Router();

// get all the playlists
router.get('/', async (req, res) => {
  const allplaylists = await Playlists.findAll();
  return res.json(allplaylists);
});

// get playlist search
router.get('/:name', async (req, res) => {
  const allPlaylists = await Playlists.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  });
  return res.json(allPlaylists);
});

// get single playlist songs
router.get('/:id/songs', async (req, res) => {
  const allplaylists = await Playlists.findAll({
    where: { id: req.params.id },
    include: [{ model: Songs, attributes: [['title', 'name'], 'length'] }],
    raw: true,
  });
  return res.json(allplaylists);
});

// top playlists
router.get('/top/playlists', async (req, res) => {
  const playlists = await Playlists.findAll({
    include: [{ model: Users}],
  })
  return res.json(playlists)
});

// delete playlist
router.delete('/:id', async (req, res) => {
  const delPlaylist = await Playlists.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(delPlaylist);
});

// update playlist
router.put('/:id', async (req, res) => {
  const playlist = await Playlists.findByPk(req.params.id);
  await playlist.update(req.body);
  res.json(playlist);
});

module.exports = router;
