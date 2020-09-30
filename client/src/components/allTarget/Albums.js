import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import network from '../../service/network';

function Albums(){
    const [albumsToDesplay, setAlbumsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 
    
    const getAlbums= async () =>{
        try{
            const artists = await network.get(`/api/albums/${search}`);
            setAlbumsToDesplay(artists.data)
        }catch(e){
            console.error(e.message)
        }
    }
    
    useEffect(()=>{
        getAlbums()
    },[search])

    return(
        <div className="all">
        <input className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <div className="allTarget">
            {
                albumsToDesplay.map((value,index)=>{
                    return(
                        <Card style={{ width: '15rem',margin:'5px', textAlign: 'center' }}>
                            <Card.Title>{value.name}</Card.Title>
                            <Link to={`/albums/${value.id}`}><Card.Img variant="top" src={value.cover_img} height="100px" width="180px" /></Link>
                            <Card.Text>
                                    {value.created_at.slice(0,10)}
                            </Card.Text>
                        </Card>
                    )
                })
            }
            </div>
            </div>
    )
}
export default Albums;