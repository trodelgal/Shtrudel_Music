import React, { useCallback } from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileMusic } from 'react-bootstrap-icons';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios  from 'axios';
   

function SinglePlaylist(){
    const [songsOfPlaylist, setSongsOfPlaylist] = useState([]) 
    const [createdDate, setCreatedDate] = useState('') 
    let {id} = useParams();
    let body = '';

    const getSongsOfPlaylist =useCallback(async () =>{
        try{
            const playlist = await axios.get(`/api/single/playlist/${id}`);
            setSongsOfPlaylist(playlist.data)
            setCreatedDate(playlist.data[0].created_at)
        }catch(e){
            console.error(e.message)
        }
    },[])
    useEffect(()=>{
        getSongsOfPlaylist()
    },[])

    console.log(songsOfPlaylist);
    console.log(createdDate);
    if (songsOfPlaylist[0] !== undefined){
        body = (
            <div className="single">
                <h1>{songsOfPlaylist[0].name}</h1>
                <img src={songsOfPlaylist[0].cover_img} alt="playlist" />
                <div>{createdDate.slice(0,10)}</div>
                <h2>Songs</h2>
                <ListGroup style={{width:'150vh'}} className="my-2">
                {
                    songsOfPlaylist.map(value=>{
                        return(  
                            <Link to={`/songs/${value.song_id}?playlist=${value.id}`}>
                                <ListGroup.Item  > 
                                    <div style={{display:'flex', justifyContent:'space-between'}}> 
                                        <div><FileMusic style={{color:'white'}}/></div>     
                                        <div> {value.song_name} </div>
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

export default SinglePlaylist;