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
      <input className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
        {/* <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{margin:10, backgroundColor:"#2e2d2d"}}
        /> */}
      {search ? (
        <>
          <SearchedArtists searchData={searchData} />
          <SearchedAlbums searchData={searchData} />
          <SearchedPlaylists searchData={searchData} />
          <SearchedSongs searchData={searchData} />
        </>
      ) : (
        <>
          <TopSongs />
          <TopArtists />
          <TopPlaylists />
          <TopAlbums />
        </>
      )}
    </div>
  );
}

export default Main;
