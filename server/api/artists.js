const { Router } = require("express");
const Sequelize = require("sequelize");
const { Artists, Songs, Albums } = require("../models");
const { searchElastic, updateElasticData, deletetElastic, updateElastic,getAllElastic } = require("./elasticFunction");

const { Op } = Sequelize;

const router = Router();
// get all
router.get("/", async (req, res) => {
  try {
    const allArtists = await getAllElastic("artists");
    return res.json(allArtists.body.hits.hits);
  } catch (err) {
    return res.json(err);
  }
});

// elasticsearch searchInput
router.get("/:search", async (req, res) => {
  try {
    const result = await searchElastic("artists", req.params.search);
    res.send(result.body.hits.hits);
  } catch (err) {
    res.send(err);
  }
});

// get all the songs of artist
router.get("/:id/songs", async (req, res) => {
  try {
    const artist = await Artists.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Songs,
        },
      ],
    });
    return res.json(artist);
  } catch (err) {
    return res.json(err);
  }
});

// get all the albums of artist with their songs
router.get("/:id/albums", async (req, res) => {
  try {
    const artist = await Artists.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Albums,
          include: [
            {
              model: Songs,
            },
          ],
        },
      ],
    });
    return res.json(artist);
  } catch (err) {
    return res.json(err);
  }
});

// get top artists
router.get("/all/top", async (req, res) => {
  try {
    const topArtists = await Songs.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("artist_id")), "numberOfSongs"],
      ],
      order: [[Sequelize.fn("COUNT", Sequelize.col("artist_id")), "DESC"]],
      limit: 20,
      group: "artist_id",
      include: [{ model: Artists }],
    });
    return res.json(topArtists);
  } catch (err) {
    return res.json(err);
  }
});

// post artist
router.post("/", async (req, res) => {
  try {
    const newArtist = await Artists.create(req.body);
    postElastic("artists", req.body);
    return res.json(newArtist);
  } catch (err) {
    return res.json(err);
  }
});

// delete artist
router.delete("/:id", async (req, res) => {
  try {
    const delArtist = await Artists.destroy({
      where: {
        id: req.params.id,
      },
    });
    deletetElastic("artists",req.params.id )
    return res.json(delArtist);
  } catch (err) {
    return res.json(err);
  }
});

// update artist
router.put("/:artistId", async (req, res) => {
  try {
    const artist = await Artists.findByPk(req.params.artistId);
    await artist.update(req.body);
    updateElastic("artists",req.params.id,req.body)
    res.json(artist);
  } catch (err) {
    return res.json(err);
  }
});
//add initial data to elasticsearch
router.put("/elastic/data", async (req, res) => {
  try {
    const allArtists = await Artists.findAll();
    const res = updateElasticData('artists', allArtists)
    res.json(res);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
