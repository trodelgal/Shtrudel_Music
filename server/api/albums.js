const { Router } = require('express');
const Sequelize = require('sequelize');
const {
  Albums, Songs, Artists, Interactions,
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
    }, {
      model: Artists,
      attributes: ['name'],
    }],
  });
  return res.json(album);
});

// get top albums
router.get('/top/albums', async (req, res) => {
  const topAlbum = await Songs.findAll({
    group: ['album_id'],
    order: [[Sequelize.fn('SUM', Sequelize.col('play_count')), 'DESC']],
    include: [{
      model: Interactions,
      attributes: [[Sequelize.fn('SUM', Sequelize.col('play_count')), 'numberOfInteractions']],
    }, { model: Albums }],
  });
  return res.json(topAlbum);
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

// delete album:
router.delete('/:id', async (req, res) => {
  const delAlbum = await Albums.destroy({
    where: {
      id: req.params.id,
    },
  });
  return res.json(delAlbum);
});

// update album:
router.put('/:id', async (req, res) => {
  const album = await Albums.findByPk(req.params.id);
  await album.update(req.body);
  res.json(album);
});

// update elasticsearch data
router.put("/elasticsearch/data", async (req, res) => {
  try{
      const allAlbums = await Albums.findAll();
      const elasticData = await client.index(
        {
          index: "shtrudel_music",
          type: "albums",
          body: { albums : allAlbums },
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
