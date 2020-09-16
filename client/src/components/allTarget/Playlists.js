import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const axios = require('axios');

function Playlists(){
    const [playlistsToDesplay, setPlaylistsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 

    useEffect(()=>{
        const ajax = async () =>{
        const playlists = await axios.get(`/api/playlist/${search}`);
        setPlaylistsToDesplay(playlists.data)
        }
        ajax()
    },[search])

    return(
        <>
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <ol >
            {
                playlistsToDesplay.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b><Link to={`/playlist/${value.id}`}>{value.name}</Link>
                            </div>
                        </li>
                    )
                })
            }
            </ol>
        </>
    )
}
export default Playlists;