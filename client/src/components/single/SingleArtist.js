import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { FileMusic } from "react-bootstrap-icons";
import { Card } from "react-bootstrap";
import Carousel from "react-elastic-carousel";
import axios from "axios";

function SingleArtist() {
  const [artistDetails, setArtistDetails] = useState([]);
  // const [albumsOfArtist, setAlbumsOfArtist]= useState([])
  let { id } = useParams();

  const getartistDetails = useCallback(async () => {
    try {
      const artistDetails = await axios.get(`/api/artists/${id}/albums`);
      setArtistDetails(artistDetails.data);
      // const albums = await axios.get(`/api/single/artist/albums/${id}`);
      // setAlbumsOfArtist(albums.data)
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  useEffect(() => {
    getartistDetails();
  }, []);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 7 },
    { width: 1500, itemsToShow: 9 },
  ];

  return (
    <div>
      {artistDetails[0] && (
        <>
          <Image src={artistDetails[0].coverImg} width="100%" height="300px" />
          <div className="single">
            <h1 className="singleTitile">{artistDetails[0].name}</h1>
            <h2>Songs</h2>
            {artistDetails[0].Albums.map(album =>album.Songs.map((value, index) => {
                if(index<5){
                    return (
                      <ListGroup
                        key={index}
                        style={{ width: "150vh" }}
                        className="my-2"
                      >
                        <Link to={`/songs/${value.id}?artists=${id}`}>
                          <ListGroup.Item>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <FileMusic style={{ color: "white" }} />
                              </div>
                              <div> {value.title} </div>
                              <div>{value.length}</div>
                            </div>
                          </ListGroup.Item>
                        </Link>
                      </ListGroup>
                    );
                }
            }))}
          </div>
          <h2>Albums</h2>
          <Carousel breakPoints={breakPoints}>
            {artistDetails[0].Albums.map((value, index) => {
              return (
                <Card
                  key={index}
                  style={{ width: "12rem", margin: "5px", textAlign: "center" }}
                >
                  <Card.Title>{value.name}</Card.Title>
                  <Link to={`/albums/${value.id}`}>
                    <Card.Img
                      variant="top"
                      src={value.coverImg}
                      height="100px"
                      width="180px"
                    />
                  </Link>
                </Card>
              );
            })}
          </Carousel>
        </>
      )}
    </div>
  );
}

export default SingleArtist;
