import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Carousel from "react-elastic-carousel";

export const SearchedArtists = React.memo(({ searchData }) => {
  const artists = searchData.filter((item) => item._index === "artists");
  // carousel option
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 7 },
    { width: 1500, itemsToShow: 9 },
  ];
  return (
    <>
      {artists[0] && (
        <>
          <h2>Artists</h2>
          <Carousel breakPoints={breakPoints}>
            {artists.map((value, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    width: "12rem",
                    margin: "5px",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  <Link to={`/artists/${value._source.id}`}>
                    <Card.Img
                      variant="top"
                      src={value._source.coverImg}
                      height="100px"
                      width="180px"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{value._source.name}</Card.Title>
                    <Card.Text>
                      <div>{value._source.name}</div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
});

export const SearchedAlbums = React.memo(({ searchData }) => {
  const albums = searchData.filter((item) => item._index === "albums");
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 7 },
    { width: 1500, itemsToShow: 9 },
  ];
  return (
    <>
      {albums[0] && (
        <>
          <h2>Albums</h2>
          <Carousel breakPoints={breakPoints}>
            {albums.map((value, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    width: "12rem",
                    margin: "5px",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  <Link to={`/albums/${value._source.id}`}>
                    <Card.Img
                      variant="top"
                      src={value._source.coverImg}
                      height="100px"
                      width="180px"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{value._source.name}</Card.Title>
                    <Card.Text>
                      <div>{value._source.name}</div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
});

export const SearchedPlaylists = React.memo(({ searchData }) => {
  const playlists = searchData.filter((item) => item._index === "playlists");
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 7 },
    { width: 1500, itemsToShow: 9 },
  ];
  return (
    <>
      {playlists[0] && (
        <>
          <h2>Playlists</h2>
          <Carousel breakPoints={breakPoints}>
            {playlists.map((value, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    width: "12rem",
                    margin: "5px",
                    textAlign: "center",
                    padding: "5px",
                  }}
                >
                  <Link to={`/playlists/${value._source.id}`}>
                    <Card.Img
                      variant="top"
                      src={value._source.coverImg}
                      height="100px"
                      width="180px"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{value._source.name}</Card.Title>
                    <Card.Text>
                      <div>{value._source.name}</div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
});

export const SearchedSongs = React.memo(({ searchData }) => {
  const songs = searchData.filter((item) => item._index === "songs");
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 7 },
    { width: 1500, itemsToShow: 9 },
  ];
  return (
    <>
      {songs[0] && (
        <>
          <h2>Songs</h2>
          <Carousel breakPoints={breakPoints}>
            {searchData &&
              searchData.map((value, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      width: "12rem",
                      margin: "5px",
                      textAlign: "center",
                      padding: "5px",
                    }}
                  >
                    <Link to={`/songs/${value._source.id}`}>
                      <Card.Body>
                        <Card.Title>{value._source.title}</Card.Title>
                        <Card.Text>
                          <div>{value._source.title}</div>
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                );
              })}
          </Carousel>
        </>
      )}
    </>
  );
});
