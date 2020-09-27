const { Router } = require('express');
const Sequelize = require('sequelize');
const { Artists, Songs, Albums } = require('../models');

const { Op } = Sequelize;

const router = Router();
// get all
router.get('/', async (req, res) => {
  const allArtists = await Artists.findAll();
  return res.json(allArtists);
});
// get search
router.get('/:name', async (req, res) => {
  const allArtists = await Artists.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  });
  return res.json(allArtists);
});

// get all the songs of artist
router.get('/:id/songs', async (req, res) => {
  const artist = await Artists.findAll({
    where: { id: req.params.id },
    include: [{
      model: Songs,
    }],
  });
  return res.json(artist);
});

// get all the albums of artist with their songs
router.get('/:id/albums', async (req, res) => {
  const artist = await Artists.findAll({
    where: { id: req.params.id },
    include: [{
      model: Albums,
      include: [{
        model: Songs,
      }],
    }],
    // raw : true
  });
  return res.json(artist);
});

// get top artists
router.get('/top/artist', async (req, res) => {
  const topArtists = await Songs.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('artist_id')), 'numberOfSongs']],
    order: [[Sequelize.fn('COUNT', Sequelize.col('artist_id')), 'DESC']],
    limit: 20,
    group: 'artist_id',
    include: [{ model: Artists }],
  });
  return res.json(topArtists);
});

// post artist
router.post('/', async (req, res) => {
  const newArtist = await Artists.create(req.body);
  return res.json(newArtist);
});

// delete artist
router.delete('/:id', async (req, res) => {
  const delArtist = await Artists.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(delArtist);
});

// update artist
router.put('/:artistId', async (req, res) => {
  const artist = await Artists.findByPk(req.params.artistId);
  await artist.update(req.body);
  res.json(artist);
});

module.exports = router;
