const { Router } = require('express');
const Sequelize = require('sequelize');
const {
  Playlists, Songs, Users, users_playlists,
} = require('../models');

const { Op } = Sequelize;

const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id:
      "my-cluster:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbyRmNzMxYmQ1MWNmZDM0MzU5YjE1NjY0NWQ1NDZjOGM5YiQwMWYzYmM3MWQxZTc0ZmI4OTM4Njk2YTcwMGM0MzU4Mg==",
  },
  auth: {
    username: "elastic",
    password: "qHwY9vazBIE7U5d2FLUhV9gz",
  },
});

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
  const playlists = await users_playlists.findAll({
    group: 'playlist_id',
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('playlist_id')), 'numberOfusers']],
    order: [[Sequelize.fn('COUNT', Sequelize.col('playlist_id')), 'DESC']],
    include: [{ model: Playlists }],
    limit: 20,
  });
  return res.json(playlists);
});

// post artist
router.post('/', async (req, res) => {
  const newPlaylist = await Playlists.create(req.body);
  return res.json(newPlaylist);
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

// update elasticsearch data
router.put("/elasticsearch/data", async (req, res) => {
  try{
      const allplaylists = await Playlists.findAll();
      const elasticData = await client.index(
        {
          index: "shtrudel_music",
          body: { playlists : allplaylists },
        },
        (err, result) => {
          if (err) {
              return err;
          } else {
            return result;
          }
        }
      );
      res.send(elasticData);
  }catch(err) {
      console.log(err);
      res.send(err)
  }
});

module.exports = router;
