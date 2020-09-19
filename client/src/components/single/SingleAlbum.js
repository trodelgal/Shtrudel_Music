import React from "react";
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
   

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
            <div className="single">
                <h1>{albumDetails[0].name}</h1>
                <img src={albumDetails[0].cover_img} alt="album image"/>
                <div>{albumDetails[0].artist_name}</div>
                <div>{createdDate.slice(0,10)}</div>
                <h2>Songs</h2>
                <ListGroup style={{width:'150vh'}} className="my-2">
                {
                    albumDetails.map(value=>{
                        return(
                            <Link to={`/songs/${value.song_id}?albums=${value.id}`}>
                            <ListGroup.Item  > 
                                <div style={{display:'flex', justifyContent:'space-around'}}> 
                                    <div>icon</div>   
                                    <div> {value.song_name}</div>
                                    <div>{value.length}</div>
                                </div>                            
                            </ListGroup.Item>
                            </Link>
                        )
                    }) 
                }
                </ListGroup>
            </div>
            )
        }

   

    return(
        <div>
            {body}
        </div>
    )
}

export default SingleAlbum;