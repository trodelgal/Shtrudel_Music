require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
    multipleStatements: true
  });

mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected music_streamer_demo!");
});

// a GET request to /top_songs/ returns a list of top 20 songs

// a GET request to /top_artists/ returns a list of top 20 artists

// a GET request to /top_albums/ returns a list of top 20 albums

// a GET request to /top_playlist/ returns a list of top 20 playlist

app.get('/api/songs', (req, res) => {
    mysqlCon.query('SELECT * FROM songs', (error, results, fields) => {
        if (error) {
            res.send(err.message);
            throw error
        };
        res.send(results);
    });
});

// a GET request to /song/123 returns the details of song 123
app.get('/api/song/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM songs WHERE id = ?',[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(err.message);
            throw error
        };
        res.send(results);
    });
});

// a GET request to /artist/123 returns the artist 123
app.get('/api/artist/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM artists WHERE id = ?',[req.params.id], (error, results, fields) => {
        if (error) {
            res.send(err.message);
            throw error
        };
        res.send(results);
    });
});

// a GET request to /album/123 returns the album 123
app.get('/api/album/:id', (req, res) => {
    mysqlCon.query(`SELECT * FROM albums WHERE id =${req.params.id}`, (error, results, fields) => {
        if (error) {
            res.send(err.message);
            throw error
        };
        res.send(results);
    });
});

// a GET request to /playlist/123 returns the playlist 123
app.get('/api/playlist/:id', (req, res) => {
    mysqlCon.query(`SELECT * FROM playlist WHERE id =${req.params.id}`, (error, results, fields) => {
        if (error) {
           res.send(err.message);
           throw error
        };
        res.send(results);
      });
});

// a POST request to /song add to songs
app.post('/api/song', async (req, res) =>{
    mysqlCon.query('INSERT INTO songs SET ?',req.body, (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         console.log('added song');
         res.send(results);
    });
});

// a POST request to /album add to album
app.post('/api/album', async (req, res) =>{
    mysqlCon.query('INSERT INTO albums SET ?',req.body, (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a POST request to /playlist add to playlist
app.post('/api/playlist', async (req, res) =>{
    mysqlCon.query('INSERT INTO playlist SET ?',req.body, (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a POST request to /artist add to artist
app.post('/api/artist', async (req, res) =>{
    mysqlCon.query('INSERT INTO artists SET ?',req.body, (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a PUT request to /song/123 update the details of song 123
app.put('/api/song/:id', async (req, res) =>{
    let {body} = req;
    mysqlCon.query(`UPDATE songs SET  artist_id=?, title=?, length=?, created_at=?, upload_at=?, youtube_link=?, lyrics=?, track_number=? WHERE id=${req.params.id}`,
    [body.artist_id,body.title,body.length,body.created_at,body.upload_at,body.youtube_link,body.lyrics,body.track_number], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a PUT request to /artist/123 update the artist 123
app.put('/api/artist/:id', async (req, res) =>{
    let {body} = req;
    mysqlCon.query(`UPDATE artists SET name=?, cover_img=?, upload_at=? WHERE id=${req.params.id}`,
    [body.name,body.cover_img,body.upload_at], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a PUT request to /album/123 update the album 123
app.put('/api/album/:id', async (req, res) =>{
    let {body} = req;
    mysqlCon.query(`UPDATE albums SET artist_id=?, name=?, created_at=?, upload_at=?, cover_img=? WHERE id=${req.params.id}`,
    [body.artist_id,body.name,body.created_at,body.upload_at,body.cover_img], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a PUT request to /playlist/123 update the playlist 123
app.put('/api/playlist/:id', async (req, res) =>{
    let {body} = req;
    mysqlCon.query(`UPDATE playlist SET user_id=?, name=?, created_at=?, upload_at=?, rules=?, cover_img=? WHERE id=${req.params.id}`,
    [body.user_id,body.name,body.created_at,body.upload_at,body.rules,body.cover_img], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a DELETE request to /song/123 delete the details of song 123
app.delete('/api/song/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM songs WHERE id=?',[req.params.id], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a DELETE request to /artist/123 delete the artist 123
app.delete('/api/artist/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM artists WHERE id=?',[req.params.id], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a DELETE request to /album/123 delete the album 123
app.delete('/api/album/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM albums WHERE id=?',[req.params.id], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

// a DELETE request to /playlist/123 delete the playlist 123
app.delete('/api/playlist/:id', async (req, res) =>{
    mysqlCon.query('DELETE FROM playlist WHERE id=?',[req.params.id], (error,results,fields)=>{
        if (error) {
            return res.send(error.message);
         };
         res.send(results);
    });
});

module.exports=app;