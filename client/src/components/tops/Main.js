import React, { useState, useCallback, useEffect } from "react";
import TopArtists from "./TopArtists";
import TopSongs from "./TopSongs";
import TopPlaylists from "./TopPlaylists";
import TopAlbums from "./TopAlbums";
import { SearchedArtists, SearchedSongs, SearchedPlaylists, SearchedAlbums } from "./Searched";
import { InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import "../../App.css";

function Main() {
  const [search, setSearch] = useState();
  const [searchData, setSearchData] = useState([]);

  const getSearchData = useCallback(async () => {
    const results = await axios.get(`/api/search/${search}`);
    console.log(results.data);
    setSearchData(results.data);
  }, [search]);

  useEffect(() => {
    if (search) {
      getSearchData();
    }
  }, [search]);

  return (
    <div className="main">
      <InputGroup size="sm" className="mb-3">
        <FormControl
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{margin:10, backgroundColor:"#2e2d2d"}}
        />
      </InputGroup>
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
