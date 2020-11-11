const { Router } = require('express');
const Sequelize = require('sequelize');
const { Artists, Songs, Albums } = require('../models');

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
    // where: { id: req.params.id },
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

// update elasticsearch data
router.put("/elasticsearch/data", async (req, res) => {
  try{
      const allArtists = await Artists.findAll();
      const elasticData = await client.index(
        {
          index: "shtrudel_music",
          body: { artists : allArtists },
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
