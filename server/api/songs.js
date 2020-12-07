const { Router } = require("express");
const Sequelize = require("sequelize");
const { Songs, Albums, Artists, Interactions } = require("../models");
const { Op } = Sequelize;
const { searchElastic, postElastic,updateElasticData, deletetElastic, updateElastic } = require("./elasticFunction");

const router = Router();

// get all
router.get("/", async (req, res) => {
  const allSongs = await Songs.findAll();
  return res.json(allSongs);
});

// elasticsearch searchInput
// router.get("/elasticsearch/:search", async (req, res) => {
//   try {
//     const result = await searchElastic("songs", req.params.search);
//     res.send(result);
//   } catch (err) {
//     res.send(err);
//   }
// });

// get search- sequelize
router.get("/:name", async (req, res) => {
  try {
    const allSong = await Songs.findAll({
      where: {
        title: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    });
    return res.json(allSong);
  } catch (err) {
    return res.json(err);
  }
});

// get one song
router.get("/:id/single", async (req, res) => {
  try {
    const song = await Songs.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Albums,
          attributes: ["name"],
        },
        {
          model: Artists,
          attributes: ["name"],
        },
      ],
    });
    return res.json(song);
  } catch (err) {
    return res.json(err);
  }
});

// get top_songs
router.get("/all/top", async (req, res) => {
  try {
    const topSongs = await Interactions.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("play_count")), "numberOfPlays"],
      ],
      order: [[Sequelize.fn("SUM", Sequelize.col("play_count")), "DESC"]],
      limit: 20,
      group: "song_id",
      include: [
        {
          model: Songs,
          include: [
            { model: Artists, attributes: [["name", "artistName"]] },
            { model: Albums, attributes: [["name", "albumName"], "coverImg"] },
          ],
        },
      ],
    });
    return res.json(topSongs);
  } catch (err) {
    return res.json(err);
  }
});

// post songs
router.post("/", async (req, res) => {
  try {
    const newSong = await Songs.create(req.body);
    postElastic("songs", req.body);
    return res.json(newSong);
  } catch (e) {
    console.error(e);
  }
});

// delete song
router.delete("/:id", async (req, res) => {
  try {
    const delSong = await Songs.destroy({
      where: {
        id: req.params.id,
      },
    });
    deletetElastic("songs",req.params.id)
    return res.json(delSong);
  } catch (err) {
    return res.json(err);
  }
});

// update song
router.put("/:id", async (req, res) => {
  try {
    const song = await Songs.findByPk(req.params.id);
    await song.update(req.body);
    updateElastic("songs",req.params.id,req.body)
    res.json(song);
  } catch (err) {
    return res.json(err);
  }
});
//add initial data to elasticsearch
router.put("/elastic/data", async (req, res) => {
  try {
    const allSongs = await Songs.findAll();
    const res = updateElasticData('songs', allSongs)
    res.json(res);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
