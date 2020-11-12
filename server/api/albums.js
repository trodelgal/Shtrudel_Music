const { Router } = require("express");
const Sequelize = require("sequelize");
const { Albums, Songs, Artists, Interactions } = require("../models");
const { searchElastic } = require("./elasticFunction");

const { Op } = Sequelize;

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allAlbums = await Albums.findAll();
    return res.json(allAlbums);
  } catch (err) {
    return res.json(err);
  }
});
router.get("/:name", async (req, res) => {
  try {
    const allAlbums = await Albums.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.name}%`,
        },
      },
    });
    return res.json(allAlbums);
  } catch (err) {
    return res.json(err);
  }
});

// elasticsearch searchInput
router.get("/elasticsearch/:search", async (req, res) => {
  try {
    const result = await searchElastic("albums", req.params.search);
    res.send(result.body);
  } catch (err) {
    res.send(err);
  }
});

// get data on one album
router.get("/:id/songs", async (req, res) => {
  try {
    const album = await Albums.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Songs,
        },
        {
          model: Artists,
          attributes: ["name"],
        },
      ],
    });
    return res.json(album);
  } catch (err) {
    return res.json(err);
  }
});

// get top albums
router.get("/top/albums", async (req, res) => {
  try {
    const topAlbum = await Songs.findAll({
      group: ["album_id"],
      order: [[Sequelize.fn("SUM", Sequelize.col("play_count")), "DESC"]],
      include: [
        {
          model: Interactions,
          attributes: [
            [
              Sequelize.fn("SUM", Sequelize.col("play_count")),
              "numberOfInteractions",
            ],
          ],
        },
        { model: Albums },
      ],
    });
    return res.json(topAlbum);
  } catch (err) {
    return res.json(err);
  }
});

// post album
router.post("/", async (req, res) => {
  try {
    const newAlbum = await Albums.create(req.body);
    postElastic("albums", req.body);
    return res.json(newAlbum);
  } catch (e) {
    console.error(e);
  }
});

// delete album:
router.delete("/:id", async (req, res) => {
  try {
    const delAlbum = await Albums.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(delAlbum);
  } catch (err) {
    return res.json(err);
  }
});

// update album:
router.put("/:id", async (req, res) => {
  try {
    const album = await Albums.findByPk(req.params.id);
    await album.update(req.body);
    res.json(album);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
