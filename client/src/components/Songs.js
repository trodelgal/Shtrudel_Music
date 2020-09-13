import React, { useEffect, useState } from "react";
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
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <ol >
            {
                songsToDesplay.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> {value.title}  <b>album name:</b> {value.name}
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