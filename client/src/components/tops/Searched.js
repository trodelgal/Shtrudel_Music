import React, { useState, useCallback, useEffect } from "react";
import { Link } from 'react-router-dom';

export const SearchedArtists = React.memo(({ searchData }) => {
    return (
      <>
        <div>Artists</div>
        {searchData &&
          searchData.map((value, index) => {
            if (value._index === "artists") {
              return (
                  <div>
                  <Link to={`/artists/${value._source.id}`}>
                  <img src={value._source.coverImg} style={{height:50, width:50}} />
                  {value._source.name}
                  </Link>
                  </div>
              );
            }
          })}
      </>
    );
  });

  export const SearchedAlbums = React.memo(({ searchData }) => {
    return (
      <>
        <div>Albums</div>
        {searchData &&
          searchData.map((value, index) => {
            if (value._index === "albums") {
              return (
                <div>
                    <Link to={`/albums/${value._source.id}`}>
                  <img src={value._source.coverImg} style={{height:50, width:50}} />
                  {value._source.name}
                  </Link>
                </div>
              );
            }
          })}
      </>
    );
  });

  export const SearchedPlaylists = React.memo(({ searchData }) => {
    return (
      <>
        <div>Playlists</div>
        {searchData &&
          searchData.map((value, index) => {
            if (value._index === "playlists") {
              return (
                <div>
                    <Link to={`/playlists/${value._source.id}`}>
                  <img src={value._source.coverImg} style={{height:50, width:50}} />
                  {value._source.name}
                  </Link>
                </div>
              );
            }
          })}
      </>
    );
  });

  export const SearchedSongs = React.memo(({ searchData }) => {
    return (
      <>
        <div>Songs</div>
        {searchData &&
          searchData.map((value, index) => {
            if (value._index === "songs") {
              return (
                <div>
                     <Link to={`/songs/${value._source.id}`}>
                  {value._source.title}
                  </Link>
                </div>
              );
            }
          })}
      </>
    );
  });