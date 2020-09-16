import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');
   

function SingleArtist(){
    const [songsOfArtist, setSongsOfArtist] = useState([]) 
    const [albumsOfArtist, setAlbumsOfArtist]= useState([])
    let {id} = useParams();
    let bodySongs = '';
    let bodyAlbums = '';

    const getSongsOfArtist = async () =>{
        const songs = await axios.get(`/api/single/artist/${id}`);
        setSongsOfArtist(songs.data)
        const albums = await axios.get(`/api/single/artist/albums/${id}`);
        setAlbumsOfArtist(albums.data)
    }
    useEffect(()=>{
        getSongsOfArtist()
    },[])

    console.log(songsOfArtist);
    console.log(albumsOfArtist);
    if (songsOfArtist[0] !== undefined){
        bodySongs = (
            <>
                <h1>{songsOfArtist[0].name}</h1>
                {/* <img src={songsOfArtist[0].cover_img} alt="artist image"/> */}
                <h2>Songs</h2>
                {
                    songsOfArtist.map(value=>{
                        return(
                            <ul id="songsOfArtistList">
                                    <Link to={`/songs/${value.song_id}?artist=${value.id}`}><li>{value.song_name}</li></Link>
                                    {/* <li><a href={value.youtube_link} target="b">youtube</a></li> */}
                            </ul>
                        )
                    }) 
                }
                </>
            )
            bodyAlbums = (
                <>
                <h2>Albums</h2>
                {
                    albumsOfArtist.map(value=>{
                        return(
                            <div>
                                <div>{value.album_name}</div>
                                {/* <img src={value.album_image}/> */}
                            </div>
                        )
                    })
                }
                </>
            )
        }

   

    return(
        <div>
            {bodySongs}
            {bodyAlbums}
        </div>
    )
}

export default SingleArtist;