import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const axios = require('axios');

function Artists(){
    const [artistsToDesplay, setArtistsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 
    useEffect(()=>{
        const ajax = async () =>{
        const artists = await axios.get(`/api/artists/${search}`);
        setArtistsToDesplay(artists.data)
        }
        ajax()
    },[search])

    return(
        <>
        <h2>All Artists</h2>
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <ol>
            {
                artistsToDesplay.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> <Link to={`/artist/${value.id}`}>{value.name}</Link>
                            </div>
                        </li>
                    )
                })
            }
            </ol>
        </>
    )
}
export default Artists;