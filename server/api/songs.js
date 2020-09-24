const { Router } = require('express');
const { Songs } = require('../models');

const router = Router();
// get all
router.get('/', async (req, res) => {
  const allSongs = await songs.findAll();
  return res.json(allSongs);
});
// get search
router.get('/:name', async (req,res) =>{

})
// get top
router.get('/top', async (req, res) => {

});
// get one song
router.get('/:id/single', async (req, res) => {

});


module.exports = router;

// // a GET request to /top_songs/ returns a list of top 20 songs
// app.get('/api/top_songs', (req, res) => {
//   const sql = `SELECT s.*, sum(play_count) AS number_of_plays, a.name AS artist_name, al.cover_img ,al.name AS album_name, s.title AS song_name, s.id AS song_id
//   FROM interactions i
//   JOIN songs s
//   ON i.song_id = s.id
//   JOIN artists a
//   ON s.artist_id = a.id
//   JOIN albums al
//   ON s.album_id = al.id
//   GROUP BY song_id
//   ORDER BY number_of_plays DESC
//   LIMIT 20;`;
//   mysqlCon.query(sql, (error, results) => {
//     if (error) {
//       res.send(error.message);
//       throw error;
//     }
//     return res.send(results);
//   });
// });
