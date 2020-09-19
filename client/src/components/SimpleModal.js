import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Header from './Header';
import axios from 'axios';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function SimpleModal({}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  // const [choosenToAdd, setChoosenToAdd] = useState('');
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [displayArtistModal, setDisplayArtistModal] = useState(false)
  const [displayAlbumModal, setDisplayAlbumModal] = useState(false)
  const [displaySongModal, setDisplaySongModal] = useState(false)
  let addForm='';


  async function postSong(){
    let songArtistId = document.getElementById('songArtistId');
    songArtistId = songArtistId.value.slice(0,2);
    let albumId = document.getElementById('albumId');
    albumId = albumId.value.slice(0,2);
    const songName = document.getElementById('songName');
    const songLength = document.getElementById('songLength');
    const songCreate = document.getElementById('songCreate');
    const songUpload = document.getElementById('songUpload');
    const youtubeLink = document.getElementById('youtubeLink');
    const lyrics = document.getElementById('lyrics');
    const TrackNumber = document.getElementById('TrackNumber');
    let postSongObj = {
            artist_id: songArtistId,
            title: songName.value,
            album_id: albumId,
            length: songLength.value,
            created_at: songCreate.value,
            upload_at: songUpload.value,
            youtube_link:youtubeLink.value,
            lyrics: lyrics.value,
            track_number: TrackNumber.value
    }
    await axios.post('/api/songs',postSongObj);
    handleClose()
  }

async function postArtist () {
    const artistName = document.getElementById('artistName');
    const artistImage = document.getElementById('artistImage');
    const artistUpload = document.getElementById('artistUpload');
    let postArtistObj = {
            name: artistName.value ,
            cover_img: artistImage.value,
            upload_at: artistUpload.value
    }
    await axios.post('/api/artists',postArtistObj);
    handleClose()
}

async function postAlbum () {
    let artistId = document.getElementById('artistId');
    artistId = artistId.value.slice(0,2);
    const albumName = document.getElementById('albumName');
    const albumCreate = document.getElementById('albumCreate');
    const albumUpload = document.getElementById('albumUpload');
    const albumImage = document.getElementById('albumImage');
    let postAlbumObj = {
            artist_id: artistId,
            name: albumName.value,
            created_at: albumCreate.value,
            upload_at: albumUpload.value,
            cover_img: albumImage.value
    }
    await axios.post('/api/albums',postAlbumObj);
    handleClose()
}

useEffect(()=>{
    const ajax = async () =>{
      const artists = await axios.get(`/api/artists/`);
      setAllArtists(artists.data);
      const albums = await axios.get('/api/albums/');
      setAllAlbums(albums.data);
    }
    ajax();
  },[])
 
  const openArtistModal = ()=>{
    setDisplayArtistModal(true)
  }
  const openAlbumModal = ()=>{
    setDisplayAlbumModal(true)
  }
  const openSongModal = ()=>{
    setDisplaySongModal(true)
  }
  function handleClose(){
    setDisplayArtistModal(false)
    setDisplayAlbumModal(false)
    setDisplaySongModal(false)
  }

  return (
    <div>
      <Modal
        open={displayArtistModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
        <h4>Artist details</h4>
        Name: <input id="artistName"/><br/>
        Cover image url: <input type="url" id="artistImage"/><br/>
        Upload at: <input id="artistUpload" type="date"/><br/>
        <button type="submit" onClick={()=>postArtist()}>add</button>  
      </div> 
      </Modal>
      <Modal
        open={displayAlbumModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
      <div style={modalStyle} className={classes.paper}>
        <h4>Album details</h4>
        Artist:
        <select id="artistId">
            {
              allArtists.map(value=>{
                  return(
                      <option>{value.id} {value.name}</option>
                  )
              })  
            }
        </select><br/>
        Name: <input id="albumName"/><br/>
        Created at: <input id="albumCreate" type="date"/><br/>
        Upload at: <input id="albumUpload" type="date"/><br/>
        Cover image url: <input id="albumImage" type="url"/><br/>
        <button type="submit" onClick={()=>postAlbum()}>add</button>  
    </div> 
      </Modal>
      <Modal
        open={displaySongModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <div style={modalStyle} className={classes.paper}>
        <h4>Song details</h4>
        <p>(the second number at the album must be equal to artist number)</p>
        Artist: 
        <select id="songArtistId">
            {
              allArtists.map(value=>{
                  return(
                      <option>{value.id} {value.name}</option>
                  )
              })  
            }
        </select><br/>
        Album:
        <select id="albumId">
            {
              allAlbums.map(value => {
                  return(
                  <option>{value.id} {value.name} {value.artist_id}</option>
                  )
              })  
            }
        </select><br/>
        Name: <input id="songName"/><br/>
        Length: <input id="songLength"/><br/>
        Created at: <input id="songCreate" type="date"/><br/>
        Upload at: <input id="songUpload" type="date"/><br/>
        Youtube link: <input id="youtubeLink" type="url"/><br/>
        Lyrics: <input id="lyrics"/><br/>
        Track number: <input id="TrackNumber"/><br/>
        <button type="submit" onClick={postSong}>add</button>  
    </div> 
      </Modal>
      <Header openArtistModal={openArtistModal} openAlbumModal={openAlbumModal} openSongModal={openSongModal}/>
    </div>
  );
}
export default SimpleModal; 