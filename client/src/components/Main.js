import React, { useEffect, useState } from "react";
import TopArtists from './tops/TopArtists';
import Artists from './allTarget/Artists';
import Playlists from './allTarget/Playlists';
import TopSongs from './tops/TopSongs';
import Songs from './allTarget/Songs';
import TopPlaylists from './tops/TopPlaylists';
import TopAlbums from './tops/TopAlbums';
import '../App.css';
// import SimpleModal from "./components/Modal";
const axios = require('axios');


function Main() {
  const [topTwentySongs, setTopTwentySongs] = useState([]);
  const [topTenArtists, setTopTenArtists] = useState([]);
  const [topTwentyPlaylists, setTopTwentyPlaylists] = useState([]);
  const [topTwentyAlbums, setTopTwentyAlbums] = useState([]);
  const [chooseTable, setChooseTable] = useState('');

  let showCoosenTable ='';

  useEffect(()=>{
    const ajax = async () =>{
      const songs = await axios.get(`/api/top_songs`);
      setTopTwentySongs(songs.data); 
      const artists = await axios.get(`/api/top_artists`);
      setTopTenArtists(artists.data);
      const playlists = await axios.get('/api/top_playlist');
      setTopTwentyPlaylists(playlists.data);
      const albums = await axios.get('/api/top_albums');
      setTopTwentyAlbums(albums.data);
    }
    ajax();
  },[])
  

  const showTopSongs = async () => {
    if(chooseTable==='showTopSongs'){
      setChooseTable('')
    }else{ 
    setChooseTable('showTopSongs')
    }
  };

  const showTopArtists = async () => {
    if(chooseTable==='showTopArtists'){
      setChooseTable('') 
    }else{
    setChooseTable('showTopArtists')
    }
  };
  const showTopPlaylists = async () => {
    if(chooseTable==='showTopPlaylists'){
      setChooseTable('') 
    }else{
    setChooseTable('showTopPlaylists')
    }
  };
  const showTopAlbums = async () => {
    if(chooseTable==='showTopAlbums'){
      setChooseTable('') 
    }else{
    setChooseTable('showTopAlbums')
    }
  };
  const showAllSong = async () => {
    if(chooseTable==='showAllSongs'){
      setChooseTable('') 
    }else{
    setChooseTable('showAllSongs')
    }
  };
  const showAllArtists = async () => {
    if(chooseTable==='showAllArtists'){
      setChooseTable('') 
    }else{
    setChooseTable('showAllArtists')
    }
  };
  const showAllPlaylists = async () => {
    if(chooseTable==='showAllPlaylists'){
      setChooseTable('') 
    }else{
    setChooseTable('showAllPlaylists')
    }
  };


  if(chooseTable === 'showTopSongs'){
    showCoosenTable = <TopSongs topTwentySongs={topTwentySongs}/>
  }else if(chooseTable === 'showTopArtists'){
    showCoosenTable = <TopArtists topTenArtists={topTenArtists}/>
  }else if (chooseTable === 'showTopPlaylists'){
    showCoosenTable = <TopPlaylists topTwentyPlaylists={topTwentyPlaylists}/>
  }else if(chooseTable === 'showTopAlbums'){
    showCoosenTable = <TopAlbums topTwentyAlbums={topTwentyAlbums}/>
  }else if(chooseTable === 'showAllSongs'){
    showCoosenTable = <Songs />
  }else if(chooseTable === 'showAllArtists'){
    showCoosenTable = <Artists />
  }else if(chooseTable === 'showAllPlaylists'){
    showCoosenTable = <Playlists />
  }else{
    showCoosenTable = '';
  } 

  return (
    <div className="Main">
      <button onClick={showAllSong} >SONGS</button>
      <button onClick={showAllArtists}>ARTISTS</button>
      <button onClick={showAllPlaylists}>PLAYLISTS</button><br/>
      <button onClick={showTopSongs}>Top songs</button>
      <button onClick={showTopArtists}>Leading artists</button>
      <button onClick={showTopPlaylists}>Popular playlists</button>
      <button onClick={showTopAlbums}>Popular Albums</button>
      {
        showCoosenTable
      }
    </div>
  );
}

export default Main;