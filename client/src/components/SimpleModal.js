import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Header from "./Header";
import axios from "axios";

function SimpleModal() {
  const [allArtists, setAllArtists] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [displayArtistModal, setDisplayArtistModal] = useState(false);
  const [displayAlbumModal, setDisplayAlbumModal] = useState(false);
  const [displaySongModal, setDisplaySongModal] = useState(false);
  const [artistIdSong, setArtistIdSong] = useState("");
  const [response, setResponse] = useState(false);
  const [add, setAdd] = useState("");
  const artistNameRef = useRef();
  const artistCoverImgRef = useRef();
  const artistUploadAtRef = useRef();
  const albumArtistRef = useRef();
  const albumNameRef = useRef();
  const albumCreatedAtRef = useRef();
  const albumUploadAtRef = useRef();
  const albumCoverImageRef = useRef();
  const songArtistRef = useRef();
  const songAlbumRef = useRef();
  const songNameRef = useRef();
  const songLengthRef = useRef();
  const songCreateRef = useRef();
  const songUploadRef = useRef();
  const songYoutubeRef = useRef();
  const songLyricsRef = useRef();
  const songtrackNumRef = useRef();


  async function postSong() {
    let postSongObj = {
      artist_id: artistIdSong,
      title: songNameRef.current.value,
      album_id: songAlbumRef.current.value.slice(0,2),
      length: songLengthRef.current.value,
      created_at: songCreateRef.current.value,
      uploaded_at: songUploadRef.current.value,
      youtube_link: songYoutubeRef.current.value,
      lyrics: songLyricsRef.current.value,
      track_number: songtrackNumRef.current.value,
    };
    const res = await axios.post("/api/songs", postSongObj);
    setAdd(res.data);
    setResponse(true);
  }

  async function postArtist() {
    let postArtistObj = {
      name: artistNameRef.current.value,
      cover_img: artistCoverImgRef.current.value,
      uploaded_at: artistUploadAtRef.current.value,
    };
    const res = await axios.post("/api/artists/", postArtistObj);
    setAdd(res.data);
    setResponse(true);
  }

  async function postAlbum() {
    let postAlbumObj = {
      artist_id: albumArtistRef.current.value.slice(0,2),
      name: albumNameRef.current.value,
      created_at: albumCreatedAtRef.current.value,
      uploaded_at: albumUploadAtRef.current.value,
      cover_img: albumCoverImageRef.current.value,
    };
    const res = await axios.post("/api/albums/", postAlbumObj);
    setAdd(res.data);
    setResponse(true);
  }

  useEffect(() => {
    const ajax = async () => {
      const artists = await axios.get(`/api/artists/`);
      setAllArtists(artists.data);
      const albums = await axios.get(`/api/albums/`);
      setAllAlbums(albums.data);
    };
    ajax();
  }, []);

  const openArtistModal = () => {
    setDisplayArtistModal(true);
  };
  const openAlbumModal = () => {
    setDisplayAlbumModal(true);
  };
  const openSongModal = () => {
    setDisplaySongModal(true);
  };
  function handleClose() {
    setDisplayArtistModal(false);
    setDisplayAlbumModal(false);
    setDisplaySongModal(false);
  }

  return (
    <div>
      <Modal
        size="lg"
        show={displayArtistModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Artist details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Name: <input id="artistName" ref={artistNameRef} />
            <br />
            Cover image url:{" "}
            <input type="url" id="artistImage" ref={artistCoverImgRef} />
            <br />
            Upload at:{" "}
            <input id="artistUpload" type="date" ref={artistUploadAtRef} />
            <br />
            <button type="submit" onClick={() => postArtist()}>
              add
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={displayAlbumModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Album details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Artist:
            <select id="artistId" ref={albumArtistRef}>
              {allArtists.map((value ,index) => {
                return (
                  <option key={index}>
                    {value._source.id} {value._source.name}
                  </option>
                );
              })}
            </select>
            <br />
            Name: <input id="albumName" ref={albumNameRef} />
            <br />
            Created at: <input id="albumCreate" type="date" ref={albumCreatedAtRef} />
            <br />
            Upload at: <input id="albumUpload" type="date" ref={albumUploadAtRef} />
            <br />
            Cover image url: <input id="albumImage" type="url" ref={albumCoverImageRef} />
            <br />
            <button type="submit" onClick={() => postAlbum()}>
              add
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={displaySongModal}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Song details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Artist:
            <select
            ref={songArtistRef}
              onChange={(e) => setArtistIdSong(e.target.value.slice(0, 2))}
              id="songArtistId"
            >
              {allArtists.map((value, index) => {
                return (
                  <option key={index}>
                    {value._source.id} {value._source.name}
                  </option>
                );
              })}
            </select>
            <br />
            Album:
            <select id="albumId" ref={songAlbumRef}>
              {allAlbums.map((value,index) => {
                if (value.artistId == artistIdSong) {
                  return (
                    <option key={index}>
                      {value.id} {value.name}
                    </option>
                  );
                }
              })}
            </select>
            <br />
            Name: <input id="songName" ref={songNameRef} />
            <br />
            Length: <input id="songLength" ref={songLengthRef} />
            <br />
            Created at: <input id="songCreate" type="date" ref={songCreateRef} />
            <br />
            Upload at: <input id="songUpload" type="date" ref={songUploadRef}/>
            <br />
            Youtube link: <input id="youtubeLink" type="url" ref={songYoutubeRef} />
            <br />
            Lyrics:
            <br /> <textarea id="lyrics" ref={songLyricsRef} />
            <br />
            Track number: <input id="TrackNumber" ref={songtrackNumRef}/>
            <br />
            <button type="submit" onClick={postSong}>
              add
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={response}
        onHide={() => setResponse(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">{add}</Modal.Title>
        </Modal.Header>
      </Modal>
      <Header
        openArtistModal={openArtistModal}
        openAlbumModal={openAlbumModal}
        openSongModal={openSongModal}
      />
    </div>
  );
}
export default SimpleModal;
