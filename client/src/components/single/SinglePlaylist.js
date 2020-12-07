import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileMusic } from "react-bootstrap-icons";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import network from '../../service/network';
import { changeSideSongs, changeFromId } from '../../redux/Actions';
import { useDispatch } from "react-redux";

function SinglePlaylist() {
  const [songsOfPlaylist, setSongsOfPlaylist] = useState([]);
  const dispatch = useDispatch();
  let { id } = useParams();

  const getSongsOfPlaylist = useCallback(async () => {
    try {
      const playlist = await network.get(`/api/playlists/${id}/songs`);
      setSongsOfPlaylist(playlist.data);
      console.log(playlist.data);
      dispatch(changeSideSongs(playlist.data))
      dispatch(changeFromId(id))
    } catch (e) {
      console.error(e.message);
    }
  }, [id]);
  useEffect(() => {
    getSongsOfPlaylist();
  }, []);

  return (
    <>
      {songsOfPlaylist[0] && (
        <div className="single">
          <h1>{songsOfPlaylist[0].name}</h1>
          <img src={songsOfPlaylist[0].coverImg} alt="playlist" />
          <div>{songsOfPlaylist[0].createdAt.slice(0, 10)}</div>
          <h2>Songs</h2>
          <ListGroup style={{ width: "150vh" }} className="my-2">
            {songsOfPlaylist[0].Songs.map((value, index) => {
              return (
                <Link key={index} to={`/songs/${value.Playlists_songs.SongId}?playlists=${songsOfPlaylist[0].id}`}>
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
              );
            })}
          </ListGroup>
        </div>
      )}
    </>
  );
}

export default SinglePlaylist;
