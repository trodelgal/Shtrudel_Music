require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const checkToken = require('./middleware/auth');

const app = express();

app.use(express.json());

function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}

app.use(logger);
// app.use(checkToken);

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

app.post('/api/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}';`;
    await mysqlCon.query(sql, async (error, results) => {
      if (error) {
        res.send(error.message);
        throw error;
      }
      if (results[0] === undefined) {
        return res.status(500).json({
          errorMessage: 'wrong login details',
        });
      }else{
      const validPass = await bcrypt.compare(password,results[0].password);
      if(!validPass){
        return res.status(500).json({
          errorMessage: 'wrong login details',
        });
      }
      const token = jwt.sign({ email },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h', // expires in 24 hours
        });
      return res.json({
        name:results[0].name,
        success: true,
        token,
      });
    }});
  }catch(err) {
    throw err;
  }
});

// a GET request to /top_songs/ returns a list of top 20 songs
app.get('/api/top_songs', checkToken, (req, res) => {
  const sql = `SELECT s.*, sum(play_count) AS number_of_plays, a.name AS artist_name, al.cover_img ,al.name AS album_name, s.title AS song_name, s.id AS song_id
  FROM interactions i
  JOIN songs s
  ON i.song_id = s.id
  JOIN artists a
  ON s.artist_id = a.id 
  JOIN albums al
  ON s.album_id = al.id
  GROUP BY song_id
  ORDER BY number_of_plays DESC
  LIMIT 20;`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /top_artists/ returns a list of top 10 artists
app.get('/api/top_artists', checkToken, (req, res) => {
  const sql = `SELECT a.* ,count(s.artist_id) AS number_of_songs 
  FROM songs s 
  JOIN artists a 
  ON s.artist_id = a.id 
  group by artist_id 
  order by number_of_songs DESC 
  LIMIT 20;`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /top_albums/ returns a list of top 20 albums
app.get('/api/top_albums', checkToken, (req, res) => {
  const sql = `SELECT a.*, ar.name AS artist_name, sum(i.play_count)
  FROM albums a  
  JOIN songs s 
  ON a.id = s.album_id 
  JOIN interactions i 
  ON i.song_id = s.id 
  JOIN artists ar
  ON ar.id = a.artist_id
  GROUP BY a.id 
  ORDER BY sum(i.play_count) DESC 
  LIMIT 20;`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /top_playlist/ returns a list of top 20 playlist
app.get('/api/top_playlist', checkToken, (req, res) => {
  const sql = `SELECT *, count(playlist_id) AS number_of_users_use_this_playlist
  FROM user_playlists up 
  JOIN playlist p
  ON p.id = up.playlist_id 
  GROUP BY playlist_id 
  ORDER BY number_of_users_use_this_playlist DESC 
  LIMIT 20;`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// a GET request to /artists /playlist /songs /albums - get all data
app.get('/api/:table/', checkToken, (req, res) => {
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
app.get('/api/:table/:name', checkToken, (req, res) => {
  const whereColumn = req.params.table === 'songs' ? 'title' : 'name';
  const sql = `SELECT * 
  FROM ${req.params.table} 
  WHERE ${whereColumn} LIKE '%${req.params.name}%'`;
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
  mysqlCon.query(`INSERT INTO ${req.params.table} SET ?`, req.body, (error) => {
    if (error) {
      console.log(error);
      return res.send(error.message);
    }
    console.log(`${req.params.table} added`);
    return res.send(`${req.params.table} added`);
  });
});

// validation
const schema = Joi.object({
  name: Joi.string().min(6).pattern(/^([^0-9]*)$/).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  is_admin: Joi.boolean().falsy('N'),
  created_at: Joi.date() ,
  upload_at: Joi.date() 
})

app.post('/api/user/register', async (req, res) => {
  try{
    const value = await schema.validateAsync(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    value.password = hashPassword;
    mysqlCon.query(`INSERT INTO users SET ?`, value, (error) => {
      if (error) {
        return res.send(error.message);
      }
      return res.send(value);
    });
  }catch(e){
    res.send(e.message)
  }
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
app.delete('/api/:table/:id', checkToken, async (req, res) => {
  mysqlCon.query(`DELETE FROM ${req.params.table} WHERE id=${req.params.id}`, (error, results) => {
    if (error) {
      return res.send(error.message);
    }
    return res.send(results);
  });
});

// get data to show each single song

app.get('/api/single/song/:id', checkToken, (req, res) => {
  const sql = `SELECT songs.*, artists.name AS artist, albums.name AS album
  FROM songs
  JOIN artists 
  ON songs.artist_id = artists.id
  JOIN albums
  ON songs.album_id = albums.id
  WHERE songs.id = ${req.params.id};`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// get data to show the songs of each artist
app.get('/api/single/artist/:id', checkToken, (req, res) => {
  const sql = `SELECT artists.*, songs.title AS song_name, songs.length, songs.youtube_link ,songs.id AS song_id 
  FROM artists 
  JOIN songs 
  ON songs.artist_id = artists.id
  WHERE artists.id = ${req.params.id};`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// get data to show the albums of each artist

app.get('/api/single/artist/albums/:id', checkToken, (req, res) => {
  const sql = `SELECT ar.*, al.name AS album_name, al.cover_img AS album_image, al.id AS album_id
  FROM artists ar
  JOIN albums al
  ON ar.id = al.artist_id
  where ar.id = ${req.params.id};`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// get data to show the album

app.get('/api/single/albums/:id', checkToken, (req, res) => {
  const sql = `SELECT al.*, ar.name AS artist_name, s.title AS song_name, s.length, s.youtube_link, s.id AS song_id 
  FROM albums al
  JOIN artists ar
  ON al.artist_id= ar.id
  JOIN songs s
  ON s.album_id = al.id
  WHERE al.id = ${req.params.id};`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

// get data to show playlist
app.get('/api/single/playlist/:id', checkToken, (req, res) => {
  const sql = `SELECT p.* , s.title AS song_name, s.length, s.youtube_link, s.id AS song_id
  FROM playlist p
  JOIN playlist_songs ps
  ON p.id = ps.playlist_id
  JOIN songs s
  ON s.id = ps.song_id
  WHERE p.id = ${req.params.id};`;
  mysqlCon.query(sql, (error, results) => {
    if (error) {
      res.send(error.message);
      throw error;
    }
    return res.send(results);
  });
});

module.exports = app;
