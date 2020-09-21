import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import axios from 'axios';

function Artists(){
    const [artistsToDesplay, setArtistsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 
    
    const getArtists =async () =>{
        try{
            const artists = await axios.get(`/api/artists/${search}`);
            setArtistsToDesplay(artists.data)
        }catch(e){
            console.error(e.message)
        }
    }
    
    useEffect(()=>{
        getArtists()
    },[search])

    return(
        <div className="all">
        <input  className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <div className="allTarget">
            {
                artistsToDesplay.map((value,index)=>{
                    return(
                        <Card style={{ width: '18rem',margin:'5px', textAlign: 'center' }}>
                            <Link to={`/artists/${value.id}`}><Card.Img style={{borderRadius:'50%'}} variant="top" src={value.cover_img} height="100px" width="180px" roundedCircle /></Link>
                            <Card.Title><b>{value.name}</b></Card.Title>
                        </Card>
                    )
                })
            }
            </div>
        </div>
    )
}
export default Artists;