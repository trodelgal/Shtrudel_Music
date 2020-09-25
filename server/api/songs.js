const { Router } = require('express');
const Sequelize = require('sequelize');
const {
  Songs, Albums, Artists, Interactions,
} = require('../models');

const { Op } = Sequelize;
const router = Router();

// get all
router.get('/', async (req, res) => {
  const allSongs = await Songs.findAll();
  return res.json(allSongs);
});

// get search
router.get('/:name', async (req, res) => {
  const allSong = await Songs.findAll({
    where: {
      title: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  });
  return res.json(allSong);
});

// get one song
router.get('/:id/single', async (req, res) => {
  const song = await Songs.findAll({
    where: {
      id: req.params.id,
    },
    include: [{
      model: Albums,
      attributes: ['name'],
    }, {
      model: Artists,
      attributes: ['name'],
    }],
  });
  return res.json(song);
});

// get top_songs
router.get('/top/songs', async (req, res) => {
  const topSongs = await Interactions.findAll({
    attributes: [[Sequelize.fn('SUM', Sequelize.col('play_count')), 'numberOfPlays']],
    order: [[Sequelize.fn('SUM', Sequelize.col('play_count')), 'DESC']],
    limit: 20,
    group: 'song_id',
    include: [{
      model: Songs,
      include: [{ model: Artists, attributes: [['name', 'artistName']] },
        { model: Albums, attributes: [['name', 'albumName'], 'coverImg'] },
      ],
    }],
  });
  return res.json(topSongs);
});

// post songs
router.post('/', async (req, res) => {
  try {
    const newSong = await Songs.create(req.body);
    return res.json(newSong);
  } catch (e) {
    console.error(e);
  }
});

// delete song
router.delete('/:id', async (req, res) => {
  const delSong = await Songs.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(delSong);
});

// update song
router.put('/:id', async (req, res) => {
  const song = await Songs.findByPk(req.params.id);
  await song.update(req.body);
  res.json(song);
});

module.exports = router;
