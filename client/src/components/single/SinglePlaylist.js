import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');
   

function SinglePlaylist(){
    const [songsOfPlaylist, setSongsOfPlaylist] = useState([]) 
    const [createdDate, setCreatedDate] = useState('') 
    let {id} = useParams();
    let body = '';

    const getSongsOfPlaylist = async () =>{
        const playlist = await axios.get(`/api/single/playlist/${id}`);
        setSongsOfPlaylist(playlist.data)
        setCreatedDate(playlist.data[0].created_at)
    }
    useEffect(()=>{
        getSongsOfPlaylist()
    },[])

    console.log(songsOfPlaylist);
    console.log(createdDate);
    if (songsOfPlaylist[0] !== undefined){
        body = (
            <>
                <h1>{songsOfPlaylist[0].name}</h1>
                {/* <img src={songsOfPlaylist[0].cover_img} alt="playlist image"/> */}
                <h2>Songs</h2>
                <div>{createdDate.slice(0,10)}</div>
                {
                    songsOfPlaylist.map(value=>{
                        return(
                            <ul id="songsOfPlaylist">
                                    <Link to={`/songs/${value.song_id}?playlist=${value.id}`}><li>{value.song_name}</li></Link>
                                    <li>{value.length}</li>
                                    {/* <li><a href={value.youtube_link} target="b">youtube</a></li> */}
                            </ul>
                        )
                    }) 
                }
            </>
            )
        }

   

    return(
        <div>
            {body}
        </div>
    )
}

export default SinglePlaylist;