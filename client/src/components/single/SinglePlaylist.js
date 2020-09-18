import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios  from 'axios';
   

function SinglePlaylist(){
    const [songsOfPlaylist, setSongsOfPlaylist] = useState([]) 
    const [createdDate, setCreatedDate] = useState('') 
    let {id} = useParams();
    let body = '';

    const getSongsOfPlaylist = async () =>{
        const playlist = await axios.get(`/api/single/playlist/${id}`);
        setSongsOfPlaylist(playlist.data)
        setCreatedDate(playlist.data[0].created_at)
    }
    useEffect(()=>{
        getSongsOfPlaylist()
    },[])

    console.log(songsOfPlaylist);
    console.log(createdDate);
    if (songsOfPlaylist[0] !== undefined){
        body = (
            <>
                <h1>{songsOfPlaylist[0].name}</h1>
                <img src={songsOfPlaylist[0].cover_img} alt="playlist image"/>
                <div>{createdDate.slice(0,10)}</div>
                <h2>Songs</h2>
                <ListGroup style={{width:'150vh', marginLeft:'15%'}} className="my-2">
                {
                    songsOfPlaylist.map(value=>{
                        return(  
                            <Link to={`/songs/${value.song_id}?playlist=${value.id}`}>
                                <ListGroup.Item  > 
                                    <div style={{display:'flex', justifyContent:'space-around'}}> 
                                        <div>icon</div>   
                                        <div> {value.song_name} </div>
                                        <div>{value.length}</div>
                                    </div>                            
                                </ListGroup.Item>
                            </Link>
                        )
                    }) 
                }
                </ListGroup>
            </>
            )
        }

   

    return(
        <div>
            {body}
        </div>
    )
}

export default SinglePlaylist;