import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopArtists(){
    const [topTenArtists, setTopTenArtists] = useState([]);

    const getTopArtists = async () => {
        try{
            const artists = await axios.get(`/api/top_artists`);
            setTopTenArtists(artists.data); 
        }catch(e){
            console.error(e.message);
        }
        
    } 
    useEffect(()=>{
        getTopArtists()
      },[])

    return(
        <>
            <h2>Top Artists</h2>
            <div className="top">
                {
                    topTenArtists.map((value,index)=>{
                        return(
                            <ul className="topDetails">
                                <li> <Link to={`/songs/${value.id}`}>{value.name}</Link></li>
                                <li><img src={value.cover_img} alt="artist img" height="30px" width="30px"/></li>
                            </ul>
                        )
                    })
                }
            </div>
        </>
    )
}
export default TopArtists;