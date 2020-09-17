import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopAlbums(){
    const [topTwentyAlbums, setTopTwentyAlbums] = useState([]);

    const getTopAlbums = async () => {
        try{
            const albums = await axios.get('/api/top_albums');
            setTopTwentyAlbums(albums.data); 
        }catch(e){
            console.error(e.message);
        }
        
    } 
    useEffect(()=>{
        getTopAlbums()
      },[])

    return(
        <>
        <h2>Top Albums</h2>
            <div className="top">
                {
                    topTwentyAlbums.map((value,index)=>{
                        return(
                            <ul className="topDetails">
                                <li> <Link to={`/songs/${value.id}`}>{value.name}</Link></li>
                                <li><img src={value.cover_img} alt="artist img" height="30px" width="30px"/></li>
                                <li>{value.artist_name}</li>
                                <li>{value.created_at.slice(0,10)}</li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
    )
}
export default TopAlbums;