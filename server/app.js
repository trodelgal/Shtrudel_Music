require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}

app.use(logger);

const mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('Connected music_streamer_demo!');
});

// a GET request to /top_songs/ returns a list of top 20 songs
app.get('/api/top_songs', (req, res) => {
  const sql = 'SELECT i.song_id, count(i.song_id) AS interactions_with_song, s.title AS song_name, sum(play_count) AS number_of_plays FROM music_streaming_demo.interactions i JOIN music_streaming_demo.songs s ON i.song_id = s.id GROUP BY song_id ORDER BY number_of_plays DESC LIMIT 20;';
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /top_artists/ returns a list of top 10 artists
app.get('/api/top_artists', (req, res) => {
  const sql = 'SELECT s.artist_id, a.name, count(s.artist_id) AS number_of_songs FROM music_streaming_demo.songs s JOIN music_streaming_demo.artists a ON s.artist_id = a.id group by artist_id order by number_of_songs DESC LIMIT 10;';
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /top_albums/ returns a list of top 20 albums
app.get('/api/top_albums', (req, res) => {
  const sql = 'SELECT a.id AS album_id, a.name , count(i.song_id) as interactions_with_album FROM albums a  JOIN music_streaming_demo.songs s ON a.id = s.album_id JOIN music_streaming_demo.interactions i ON i.song_id = s.id GROUP BY a.id ORDER BY interactions_with_album DESC LIMIT 20;';
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /top_playlist/ returns a list of top 20 playlist
app.get('/api/top_playlist', (req, res) => {
  const sql = 'SELECT playlist_id, count(playlist_id) AS number_of_users_use_this_playlist, p.name FROM music_streaming_demo.user_playlists up JOIN music_streaming_demo.playlist p ON p.id = up.playlist_id GROUP BY playlist_id ORDER BY number_of_users_use_this_playlist DESC LIMIT 20;';
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /artists /playlist /songs /albums - get all data
app.get('/api/:table/', (req, res) => {
  const sql = `SELECT * FROM ${req.params.table};`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /artists /playlist /songs /albums - to use search
app.get('/api/:table/:name', (req, res) => {
  const whereColumn = req.params.table === 'songs' ? 'title' : 'name';
  const sql = `SELECT * FROM ${req.params.table} WHERE ${whereColumn} LIKE '%${req.params.name}%'`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a POST request to /songs/albums/playlist/artists
app.post('/api/:table', async (req, res) => {
  mysqlCon.query(`INSERT INTO ${req.params.table} SET ?`, req.body, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    console.log(`added ${req.params.table}`);
    return res.send(results);
  });
});

// a PUT request to /artist/123 update the artist 123
app.put('/api/:table/:id', async (req, res) => {
  const { body } = req;
  mysqlCon.query(`UPDATE ${req.params.table} SET ? WHERE id=${req.params.id}`, body, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    return res.send(results);
  });
});

// a DELETE request to /song/123 delete the details of song 123
app.delete('/api/:table/:id', async (req, res) => {
  mysqlCon.query(`DELETE FROM ${req.params.table} WHERE id=${req.params.id}`, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    return res.send(results);
  });
});

module.exports = app;
