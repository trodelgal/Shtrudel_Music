import React, { useEffect, useState } from "react";
import TopArtists from './components/TopArtists';
import TopSongs from './components/TopSongs';
import TopPlaylists from './components/TopPlaylists';
import TopAlbums from './components/TopAlbums';
import Header from './components/Header';
import './App.css';
const axios = require('axios');


function App() {
  const [topTwentySongs, setTopTwentySongs] = useState([]);
  const [topTenArtists, setTopTenArtists] = useState([]);
  const [topTwentyPlaylists, setTopTwentyPlaylists] = useState([]);
  const [topTwentyAlbums, setTopTwentyAlbums] = useState([]);
  const [chooseTable, setChooseTable] = useState('');
  const [songs,setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [search, setSearch] = useState('')
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

  if(chooseTable === 'showTopSongs'){
    showCoosenTable = <TopSongs topTwentySongs={topTwentySongs}/>
  }else if(chooseTable === 'showTopArtists'){
    showCoosenTable = <TopArtists topTenArtists={topTenArtists}/>
  }else if (chooseTable === 'showTopPlaylists'){
    showCoosenTable = <TopPlaylists topTwentyPlaylists={topTwentyPlaylists}/>
  }else if(chooseTable === 'showTopAlbums'){
    showCoosenTable = <TopAlbums topTwentyAlbums={topTwentyAlbums}/>
  }else{
    showCoosenTable = '';
  } 


  return (
    <div className="App">
      <Header/>
      <input type="text" placeholder="search"/><br/>
      <button onClick={showTopSongs}>The 20 most popular songs</button>
      <button onClick={showTopArtists}>The artists with the most songs</button>
      <button onClick={showTopPlaylists}>The 20 popular playlists</button>
      <button onClick={showTopAlbums}>The 20 popular Albums</button>
      {
        showCoosenTable
      }
    </div>
  );
}

export default App;
