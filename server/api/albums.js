const { Router } = require('express');
const Sequelize = require('sequelize');
const {
  Albums, Songs, Artists, Interactions,
} = require('../models');

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
    }, {
      model: Artists,
      attributes: ['name'],
    }],
  });
  return res.json(album);
});

// get top albums
router.get('/top/albums', async (req, res) => {
  const topAlbum = await Albums.findAll({
    group: ['id'],
    limit: 20,
    include: [{ model: Artists, attributes: [['name', 'artistName']] },
      {
        model: Songs,
        attributes: ['id'],
        include: [{
          model: Interactions,
          group: ['song_id'],
          attributes: ['playCount'],
        }],
      }],
  });
  return res.json(topAlbum);
});
//   const sql = `SELECT a.*, ar.name AS artist_name, sum(i.play_count)
//   FROM albums a
//   JOIN songs s
//   ON a.id = s.album_id
//   JOIN interactions i
//   ON i.song_id = s.id
//   JOIN artists ar
//   ON ar.id = a.artist_id
//   GROUP BY a.id
//   ORDER BY sum(i.play_count) DESC
//   LIMIT 20;`;

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

module.exports = router;
