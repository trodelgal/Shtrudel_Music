import React, { useState, useCallback, useEffect } from "react";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import TopPlaylists from "./TopPlaylists";
import TopAlbums from "./TopAlbums";
import { SearchedArtists, SearchedSongs, SearchedPlaylists, SearchedAlbums } from "./Searched";
import { InputGroup, FormControl } from "react-bootstrap";
import network from '../../service/network';
import "../../App.css";


function Main() {
  const [search, setSearch] = useState();
  const [searchData, setSearchData] = useState([]);

  const getSearchData = useCallback(async () => {
    const results = await network.get(`/api/search/${search}`);
    setSearchData(results.data);
  }, [search]);

  useEffect(() => {
    if (search) {
      getSearchData();
    }
  }, [search]);

  return (
    <div className="main">
          <TopSongs />
          <TopArtists />
          <TopPlaylists />
          {/* <TopAlbums /> */}
    </div>
  );
}

export default Main;
