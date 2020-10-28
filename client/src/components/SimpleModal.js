import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Header from './Header';
import network from '../service/network';

function SimpleModal() {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [displayArtistModal, setDisplayArtistModal] = useState(false);
  const [displayAlbumModal, setDisplayAlbumModal] = useState(false);
  const [displaySongModal, setDisplaySongModal] = useState(false);
  const [artistIdSong, setArtistIdSong ]= useState('');
  const [response,setResponse]=useState(false);
  const [add, setAdd] = useState('');

  async function postSong(){
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
            artist_id: artistIdSong,
            title: songName.value,
            album_id: albumId,
            length: songLength.value,
            created_at: songCreate.value,
            uploaded_at: songUpload.value,
            youtube_link:youtubeLink.value,
            lyrics: lyrics.value,
            track_number: TrackNumber.value
    }
    const res = await network.post('/api/songs',postSongObj);
    setAdd(res.data)
    setResponse(true)
  }

async function postArtist () {
    const artistName = document.getElementById('artistName');
    const artistImage = document.getElementById('artistImage');
    const artistUpload = document.getElementById('artistUpload');
    let postArtistObj = {
            name: artistName.value ,
            cover_img: artistImage.value,
            uploaded_at: artistUpload.value
    }
    const res = await network.post('/api/artists',postArtistObj);
    setAdd(res.data)
    setResponse(true)
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
            uploaded_at: albumUpload.value,
            cover_img: albumImage.value
    }
    const res = await network.post('/api/albums',postAlbumObj);
    setAdd(res.data)
    setResponse(true)
}

useEffect(()=>{
    const ajax = async () =>{
      const artists = await network.get(`/api/artists/`);
      setAllArtists(artists.data);
      const albums = await network.get('/api/albums/');
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
        size="lg"
        show={displayArtistModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Artist details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>  
              <div>
                  Name: <input id="artistName"/><br/>
                  Cover image url: <input type="url" id="artistImage"/><br/>
                  Upload at: <input id="artistUpload" type="date"/><br/>
                  <button type="submit" onClick={()=>postArtist()}>add</button>  
              </div> 
          </Modal.Body>
        </Modal>
        <Modal
        size="lg"
        show={displayAlbumModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Album details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>  
              <div>
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
          </Modal.Body>
        </Modal>
        <Modal
        size="lg"
        show={displaySongModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
              Song details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>  
              <div>
        Artist: 
        <select onChange={(e)=>setArtistIdSong(e.target.value.slice(0,2))} id="songArtistId">
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
                if(value.artist_id == artistIdSong){
                  return(
                  <option>{value.id} {value.name}</option>
                  )
                }
              })  
            }
        </select><br/>
        Name: <input id="songName"/><br/>
        Length: <input id="songLength"/><br/>
        Created at: <input id="songCreate" type="date"/><br/>
        Upload at: <input id="songUpload" type="date"/><br/>
        Youtube link: <input id="youtubeLink" type="url"/><br/>
        Lyrics:<br/> <textarea  id="lyrics"/><br/>
        Track number: <input id="TrackNumber"/><br/>
        <button type="submit" onClick={postSong}>add</button>  
              </div> 
          </Modal.Body>
        </Modal>
        <Modal
        size="sm"
        show={response}
        onHide={()=>setResponse(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
              {add}
              </Modal.Title>
            </Modal.Header>
        </Modal>
      <Header openArtistModal={openArtistModal} openAlbumModal={openAlbumModal} openSongModal={openSongModal}/>
    </div>
  );
}
export default SimpleModal; 
