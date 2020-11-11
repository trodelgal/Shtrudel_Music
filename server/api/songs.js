const { Router } = require('express');
const Sequelize = require('sequelize');
const {
  Songs, Albums, Artists, Interactions,
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

// update elasticsearch data
router.put("/elasticsearch/data", async (req, res) => {
  try{
      const allSongs = await Songs.findAll();
      const elasticData = await client.index(
        {
          index: "shtrudel_music",
          body: { songs : allSongs },
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
