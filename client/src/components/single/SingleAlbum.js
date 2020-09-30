import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FileMusic } from 'react-bootstrap-icons';
import network from '../../service/network';
   

function SingleAlbum(){
    const [albumDetails, setAlbumDetails] = useState([]) 
    const [createdDate, setCreatedDate] = useState('') 
    let {id} = useParams();
 
    let body = '';

    const getAlbumDetails = useCallback(async () =>{
        try{
            const album = await network.get(`/api/single/albums/${id}`);
            setAlbumDetails(album.data)
            setCreatedDate(album.data[0].created_at)
        }catch(e){
            console.error(e.message)
        }
    },[])
    useEffect(()=>{
        getAlbumDetails()
    },[])

    if (albumDetails[0] !== undefined){
        body = (
            <div className="single">
                <h1>{albumDetails[0].name}</h1>
                <img src={albumDetails[0].cover_img} alt="album"/>
                <div>{albumDetails[0].artist_name}</div>
                <div>{createdDate.slice(0,10)}</div>
                <h2>Songs</h2>
                <ListGroup style={{width:'150vh'}} className="my-2">
                {
                    albumDetails.map(value=>{
                        return(
                            <Link to={`/songs/${value.song_id}?albums=${value.id}`}>
                            <ListGroup.Item  > 
                                <div style={{display:'flex', justifyContent:'space-between'}}> 
                                    <div><FileMusic style={{color:'white'}}/></div>   
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