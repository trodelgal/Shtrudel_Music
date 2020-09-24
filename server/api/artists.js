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

router.get('/top', async (req, res) => {

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
      include:[{
        row: false,
        model: Songs
      }]
    }],
  });
  return res.json(artist);
});

router.post('/', async (req, res) => {
  try {
    const newArtist = await Artists.create(req.body);
    return res.json(newArtist);
  } catch (e) {
    console.error(e);
  }
});
module.exports = router;
