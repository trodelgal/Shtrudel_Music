import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const axios = require('axios');

function Albums(){
    const [artistsToDesplay, setArtistsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 
    useEffect(()=>{
        const ajax = async () =>{
        const artists = await axios.get(`/api/albums/${search}`);
        setArtistsToDesplay(artists.data)
        }
        ajax()
    },[search])

    return(
        <>
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <ol>
            {
                artistsToDesplay.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> <Link to={`/albums/${value.id}`}>{value.name}</Link>
                            </div>
                        </li>
                    )
                })
            }
            </ol>
        </>
    )
}
export default Albums;