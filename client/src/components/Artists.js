import React, { useEffect, useState } from "react";
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
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <ol>
            {
                artistsToDesplay.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> {value.name}
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