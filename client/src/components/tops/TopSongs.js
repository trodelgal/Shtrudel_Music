import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopSongs(){
    const [topTwentySongs, setTopTwentySongs] = useState([]);
    const getTopSongs = async () => {
        try{
            const songs = await axios.get(`/api/top_songs`);
            setTopTwentySongs(songs.data); 
        }catch(e){
            console.error(e.message);
        }
        
    } 
    useEffect(()=>{
        getTopSongs()
      },[])

    return(
        <>
            <h2>Top Songs</h2>
            <div className="top">
                {
                    topTwentySongs.map((value,index)=>{
                        return(
                            <ul className="topDetails">
                                <li> <Link to={`/songs/${value.id}`}>{value.title}</Link></li>
                                <li>{value.artist_name}</li>
                                <li>{value.album_name}</li>
                                <li><img src={value.cover_img} alt="album img" height="30px" width="30px"/></li>
                                <li>{value.length}</li>
                                <li>{value.uploaded_at.slice(0,10)}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
    )
}
export default TopSongs;