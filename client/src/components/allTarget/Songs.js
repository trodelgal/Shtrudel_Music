import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
const axios = require('axios');

function Songs(){
    const [songsToDesplay, setSongToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 

    useEffect(()=>{
        const ajax = async () =>{
        const songs = await axios.get(`/api/songs/${search}`);
        setSongToDesplay(songs.data)
        }
        ajax()
    },[search])
    return(
        <>
        <h2>All Songs</h2>
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <ol >
            {
                songsToDesplay.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> <Link to={`/song/${value.id}`}>{value.title}</Link>
                            </div>
                        </li>
                    )
                })
            }
            </ol>
        </>
    )
}
export default Songs;