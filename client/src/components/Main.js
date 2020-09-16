import React, { useEffect, useState } from "react";
import TopArtists from './tops/TopArtists';
import TopSongs from './tops/TopSongs';
import TopPlaylists from './tops/TopPlaylists';
import TopAlbums from './tops/TopAlbums';
import '../App.css';
const axios = require('axios');


function Main() {
  const [topTwentySongs, setTopTwentySongs] = useState([]);
  const [topTenArtists, setTopTenArtists] = useState([]);
  const [topTwentyPlaylists, setTopTwentyPlaylists] = useState([]);
  const [topTwentyAlbums, setTopTwentyAlbums] = useState([]);
  // const [chooseTable, setChooseTable] = useState('');

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
  

  // const showTopSongs = async () => {
  //   if(chooseTable==='showTopSongs'){
  //     setChooseTable('')
  //   }else{ 
  //   setChooseTable('showTopSongs')
  //   }
  // };

  // const showTopArtists = async () => {
  //   if(chooseTable==='showTopArtists'){
  //     setChooseTable('') 
  //   }else{
  //   setChooseTable('showTopArtists')
  //   }
  // };
  // const showTopPlaylists = async () => {
  //   if(chooseTable==='showTopPlaylists'){
  //     setChooseTable('') 
  //   }else{
  //   setChooseTable('showTopPlaylists')
  //   }
  // };
  // const showTopAlbums = async () => {
  //   if(chooseTable==='showTopAlbums'){
  //     setChooseTable('') 
  //   }else{
  //   setChooseTable('showTopAlbums')
  //   }
  // };

  // if(chooseTable === 'showTopSongs'){
  //   showCoosenTable = <TopSongs topTwentySongs={topTwentySongs}/>
  // }else if(chooseTable === 'showTopArtists'){
  //   showCoosenTable = <TopArtists topTenArtists={topTenArtists}/>
  // }else if (chooseTable === 'showTopPlaylists'){
  //   showCoosenTable = <TopPlaylists topTwentyPlaylists={topTwentyPlaylists}/>
  // }else if(chooseTable === 'showTopAlbums'){
  //   showCoosenTable = <TopAlbums topTwentyAlbums={topTwentyAlbums}/>
  // }else{
  //   showCoosenTable = '';
  // } 

  return (
    <div className="Main">
      {/* <button onClick={showTopSongs}>Top songs</button>
      <button onClick={showTopArtists}>Leading artists</button>
      <button onClick={showTopPlaylists}>Popular playlists</button>
      <button onClick={showTopAlbums}>Popular Albums</button>
      {
        showCoosenTable
      } */}
      <TopSongs topTwentySongs={topTwentySongs}/>
      <TopArtists topTenArtists={topTenArtists}/>
      <TopPlaylists topTwentyPlaylists={topTwentyPlaylists}/>
      <TopAlbums topTwentyAlbums={topTwentyAlbums}/>
    </div>
  );
}

export default Main;