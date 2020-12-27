const { Router } = require('express');
const { searchElastic } = require("./elasticFunction");
const { Users } = require("../models");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const checkToken = require('../middleware/auth');
const router = Router();
function logger(req, res, next) {
  console.log(`request fired ${req.url} ${req.method}`);
  next();
}

router.use(logger);

router.use('/songs', checkToken, require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', checkToken, require('./artists'));
router.use('/playlists', checkToken, require('./playlists'));

router.get('/search/:search', checkToken,  async (req, res)=>{
  try{
    const artists = await searchElastic("artists", req.params.search);
    const albums = await searchElastic("albums", req.params.search);
    const songs = await searchElastic("songs", req.params.search);
    const playlists = await searchElastic("playlists", req.params.search);
    const results = [...artists.body.hits.hits, ...albums.body.hits.hits, ...songs.body.hits.hits,...playlists.body.hits.hits]
    res.json(results);
  }catch(err){
    res.json(err)
  }
})

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email:email }
    });
    if(!user){
      return res.status(500).json({
        errorMessage: 'wrong login details'
      })
    }
    const validPass = await bcrypt.compare(password,user.password);
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
      name:user.name,
      success: true,
      token,
    });
  }catch(err) {
    throw err;
  }
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

router.post('/register', async (req, res) => {
  try{
    const value = await schema.validateAsync(req.body);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    value.password = hashPassword;
    const newUser = await Users.create(value);
    return res.send(newUser);
  }catch(e){
    res.send(e.message)
  }
});

module.exports = router;
