const { Router } = require("express");
const Sequelize = require("sequelize");
const { Playlists, Songs, Users, users_playlists } = require("../models");

const { searchElastic, updateElasticData, deletetElastic, updateElastic, getAllElastic } = require("./elasticFunction");
const { Op } = Sequelize;

const router = Router();

// get all the playlists
router.get("/", async (req, res) => {
  try {
    const allplaylists = await getAllElastic("playlists");
    return res.json(allplaylists.body.hits.hits);
  } catch (err) {
    return res.json(err);
  }
});

// elasticsearch searchInput
router.get("/:search", async (req, res) => {
  try {
    const result = await searchElastic("playlists", req.params.search);
    res.send(result.body.hits.hits);
  } catch (err) {
    res.send(err);
  }
});

// get single playlist songs
router.get("/:id/songs", async (req, res) => {
  try {
    const allplaylistss = await Playlists.findAll({
      where: { id: req.params.id },
      include: [{ model: Songs, attributes: [["title", "name"], "length", "id"] }],
    });
    return res.json(allplaylistss);
  } catch (err) {
    return res.json(err);
  }
});

// top playlists
router.get("/all/top", async (req, res) => {
  try {
    const playlists = await users_playlists.findAll({
      group: "playlist_id",
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("playlist_id")), "numberOfusers"],
      ],
      order: [[Sequelize.fn("COUNT", Sequelize.col("playlist_id")), "DESC"]],
      include: [{ model: Playlists }],
      limit: 20,
    });
    return res.json(playlists);
  } catch (err) {
    return res.json(err);
  }
});

// post playlist
router.post("/", async (req, res) => {
  try {
    const newPlaylist = await Playlists.create(req.body);
    postElastic("playlists", req.body);
    return res.json(newPlaylist);
  } catch (err) {
    return res.json(err);
  }
});

// delete playlist
router.delete("/:id", async (req, res) => {
  try {
    const delPlaylist = await Playlists.destroy({
      where: {
        id: req.params.id,
      },
    });
    deletetElastic("playlists",req.params.id )
    return res.json(delPlaylist);
  } catch (err) {
    return res.json(err);
  }
});

// update playlist
router.put("/:id", async (req, res) => {
  try {
    const playlist = await Playlists.findByPk(req.params.id);
    await playlist.update(req.body);
    updateElastic("playlists",req.params.id, req.body)
    res.json(playlist);
  } catch (err) {
    return res.json(err);
  }
});

//add initial data to elasticsearch
router.put("/elastic/data", async (req, res) => {
  try {
    const allPlaylists = await Playlists.findAll();
    const res = updateElasticData('playlists', allPlaylists)
    res.json(res);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
