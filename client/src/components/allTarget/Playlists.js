import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import axios from 'axios';

function Playlists(){
    const [playlistsToDesplay, setPlaylistsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 

    const getPlaylists = async () =>{
        try{
            const playlists = await axios.get(`/api/playlist/${search}`);
            setPlaylistsToDesplay(playlists.data)
        }catch(e){
            console.error(e.message)
        }
    }

    useEffect(()=>{
        getPlaylists()
    },[search])

    return(
        <div className="all">
        <input  className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
        <div className="allTarget">
            {
                playlistsToDesplay.map((value,index)=>{
                    return(
                    <Card style={{ width: '12rem',margin:'5px',textAlign: 'center' }}>
                        <Card.Title ><b>{value.name}</b></Card.Title>
                        <Link to={`/playlist/${value.id}`}><Card.Img variant="top" src={value.cover_img} height="100px" width="180px" /></Link>
                        <Card.Text>{value.created_at.slice(0,10)} </Card.Text>
                    </Card>
                    )
                })
            }
        </div>
        </div>
    )
}
export default Playlists;