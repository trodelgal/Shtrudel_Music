const { Router } = require("express");
const Sequelize = require("sequelize");
const { Albums, Songs, Artists, Interactions } = require("../models");
const { searchElastic, updateElasticData, deletetElastic, updateElastic } = require("./elasticFunction");

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
// router.get("/elasticsearch/:search", async (req, res) => {
//   try {
//     if(req.params.search !== ''){
//       const result = await searchElastic("albums", req.params.search);
//       return res.send(result.body);
//     }else{
//       const allAlbums = await Albums.findAll({})
//       return res.send(allAlbums);
//     }
//   } catch (err) {
//     res.send(err);
//   }
// });

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
router.get("/all/top", async (req, res) => {
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
    deletetElastic("albums",req.params.id )
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
    updateElastic("albums",req.params.id,req.body)
    return res.json(album);
  } catch (err) {
    return res.json(err);
  }
});

//add initial data to elasticsearch
router.put("/elastic/data", async (req, res) => {
  try {
    const allAlbums = await Albums.findAll();
    const res = updateElasticData('albums', allAlbums)
    res.json(res);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
