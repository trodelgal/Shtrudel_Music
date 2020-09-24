const { Router } = require('express');
const Sequelize = require('sequelize');
const { Albums, Songs, Artists } = require('../models');

const { Op } = Sequelize;

const router = Router();

router.get('/', async (req, res) => {
  const allAlbums = await Albums.findAll();
  return res.json(allAlbums);
});
router.get('/:name', async (req, res) => {
  const allAlbums = await Albums.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  });
  return res.json(allAlbums);
});
// get data on one album
router.get('/:id/songs', async (req, res) => {
  const album = await Albums.findAll({
    where: { id: req.params.id },
    include: [{
      model: Songs,
    },{
      model: Artists,
      attributes: ['name']
    }],
  });
  return res.json(album);
});

//get top albums
router.get('/top', async (req, res) => {
});

// post album
router.post('/', async (req, res) => {
  try {
    const newAlbum = await Albums.create(req.body);
    return res.json(newAlbum);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
