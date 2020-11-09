import React from "react";
import TopArtists from './TopArtists';
import TopSongs from './TopSongs';
import TopPlaylists from './TopPlaylists';
import TopAlbums from './TopAlbums';
import SimpleModal from "../SimpleModal";
import '../../App.css';



function Main() {
 
  return (
    <div className="main">
      <SimpleModal/>
      <TopSongs/>
      <TopArtists/>
      <TopPlaylists/>
      <TopAlbums/>
    </div>
  );
}

export default Main;