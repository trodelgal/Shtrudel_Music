const { Router } = require("express");
const Sequelize = require("sequelize");
const { Playlists, Songs, Users, users_playlists } = require("../models");

const { searchElastic } = require("./elasticFunction");
const { Op } = Sequelize;

const router = Router();

// get all the playlists
router.get("/", async (req, res) => {
  try {
    const allplaylists = await Playlists.findAll();
    return res.json(allplaylists);
  } catch (err) {
    return res.json(err);
  }
});

// get playlist search
router.get("/:name", async (req, res) => {
  try {
    const allPlaylists = await Playlists.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    });
    return res.json(allPlaylists);
  } catch (err) {
    return res.json(err);
  }
});

// elasticsearch searchInput
router.get("/elasticsearch/:search", async (req, res) => {
  try {
    const result = await searchElastic("playlists", req.params.search);
    res.send(result.body);
  } catch (err) {
    res.send(err);
  }
});

// get single playlist songs
router.get("/:id/songs", async (req, res) => {
  try {
    const allplaylists = await Playlists.findAll({
      where: { id: req.params.id },
      include: [{ model: Songs, attributes: [["title", "name"], "length"] }],
      raw: true,
    });
    return res.json(allplaylists);
  } catch (err) {
    return res.json(err);
  }
});

// top playlists
router.get("/top/playlists", async (req, res) => {
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
    res.json(playlist);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
