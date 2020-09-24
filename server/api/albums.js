const { Router } = require('express');
const { Albums } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const allAlbums = await Albums.findAll();
  return res.json(allAlbums);
});
router.get('/:name', async (req, res) => {
  const allAlbums = await Albums.findAll();
  return res.json(allAlbums);
});
router.get('/:id/songs', async (req, res) => {
  const album = await Albums.findByPk(req.params.id);
  const songs = await album.getSongs();
  return res.json(songs);
});
router.get('/top', async (req, res) => {
  const allAlbums = await Albums.findAll();
  return res.json(allAlbums);
});

module.exports = router;