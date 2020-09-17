import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopPlaylists(){
    const [topTwentyPlaylists, setTopTwentyPlaylists] = useState([]);

    const getTopPlaylist = async () => {
        try{
            const playlists = await axios.get('/api/top_playlist');
            setTopTwentyPlaylists(playlists.data); 
        }catch(e){
            console.error(e.message);
        }
        
    } 
    useEffect(()=>{
        getTopPlaylist()
      },[])

    return(
        <>
            <h2>Top Playlists</h2>
            <div className="top">
                {
                    topTwentyPlaylists.map((value,index)=>{
                        return(
                            <ul className="topDetails">
                                <li> <Link to={`/songs/${value.id}`}>{value.name}</Link></li>
                                <li><img src={value.cover_img} alt="artist img" height="30px" width="30px"/></li>
                                <li>{value.created_at.slice(0,10)}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
    )
}
export default TopPlaylists;