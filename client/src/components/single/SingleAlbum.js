import React from "react";
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');
   

function SingleAlbum(){
    const [albumDetails, setAlbumDetails] = useState([]) 
    const [createdDate, setCreatedDate] = useState('') 
    let {id} = useParams();
 


    let body = '';

    const getAlbumDetails = async () =>{
        const album = await axios.get(`/api/single/albums/${id}`);
        setAlbumDetails(album.data)
        setCreatedDate(album.data[0].created_at)
    }
    useEffect(()=>{
        getAlbumDetails()
    },[])

    if (albumDetails[0] !== undefined){
        body = (
            <>
                <h1>{albumDetails[0].name}</h1>
                <h2>{albumDetails[0].artist_name}</h2>
                {/* <img src={albumDetails[0].cover_img} alt="album image"/> */}
                <div>{createdDate.slice(0,10)}</div>
                <h2>Songs</h2>
                {
                    albumDetails.map(value=>{
                        return(
                            <ul id="songsOfAlbum">
                                    <Link to={`/songs/${value.song_id}?albums=${value.id}`}><li>{value.song_name}</li></Link>
                                    <li>{value.length}</li>
                            </ul>
                        )
                    }) 
                }
            </>
            )
        }

   

    return(
        <div>
            {body}
        </div>
    )
}

export default SingleAlbum;