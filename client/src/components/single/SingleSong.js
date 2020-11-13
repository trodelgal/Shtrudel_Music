import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Youtube from "./Youtube";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function SingleSong() {
  const [songData, setSongData] = useState([]);
  const [youtubeId, setYoutubeId] = useState("");
  const [sideData, setSideData] = useState([]);
  const [showlyrics, setShowLyrics] = useState(false);

  let { id } = useParams();
  let queryId = useLocation().search.split("=")[1];
  let queryFrom = useLocation().search.split("=")[0];
  let query = useLocation().search;

  // get the data of the song for play it
  const getSongData = useCallback(async () => {
    try {
      const song = await axios.get(`/api/songs/${id}/single`);
      setSongData(song.data);
      setYoutubeId(getIdSong(song.data[0].youtubeLink));
      if (queryFrom) {
        // data for side bar
        const side = await axios.get(
          `/api/${queryFrom.slice(1)}/${queryId}/songs`
        );
        setSideData(side.data);
      } else {
          let i = Math.floor(Math.random()*10)
        const side = await axios.get(`/api/artists/${song.data[0].artistId}/songs`);
        setSideData(side.data);
      }
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  useEffect(() => {
    getSongData();
  }, []);

  function getIdSong(link) {
    let video_id = link.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  async function changeSong(value) {
    const song = await axios.get(`/api/songs/${value.id}/single`);
    console.log(song.data);
    setSongData(song.data);
    setYoutubeId(getIdSong(song.data[0].youtubeLink));
  }

  return (
    <>
      <div id="singleSong">
        {songData[0] && youtubeId && (
          <div id="iframe">
            <Youtube youtubeLink={youtubeId} />
          </div>
        )}
        <div id="side">
          {songData[0] && (
            <>
              <div>Name: {songData[0].title}</div>
              <div>{songData[0].length}</div>
              <div>{songData[0].createdAt.slice(0, 10)}</div>
              <div>Album: {songData[0].album}</div>
              <div>Artist: {songData[0].artist}</div>
              <button onClick={() => setShowLyrics(true)}>lyrics</button>
              <Modal
                size="sm"
                show={showlyrics}
                onHide={() => setShowLyrics(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    song lyrics
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>{songData[0].lyrics}</div>
                </Modal.Body>
              </Modal>
            </>
          )}
          <ListGroup
            style={{ width: "90%", padding: "8%", color: "black" }}
            className="my-2"
          >
            {sideData[0] &&
              sideData[0].Songs.map((value, index) => {
                let play =
                  value.id === songData[0].id ? "#343a40" : "black";
                return (
                  <ListGroup.Item key={index}>
                    <Link
                      style={{ color: "white" }}
                      to={`/songs/${value.id}/${query}`}
                    >
                      <div
                        onClick={() => changeSong(value)}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          backgroundColor: play,
                        }}
                      >
                        <div style={{ alignSelf: "left" }}>
                          <img
                            src={sideData[0].coverImg}
                            width="30px"
                            alt="pic"
                          />
                        </div>
                        <div>{value.title}</div>
                        <div>{value.length}</div>
                      </div>
                    </Link>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </div>
      </div>
    </>
  );
}

export default SingleSong;
