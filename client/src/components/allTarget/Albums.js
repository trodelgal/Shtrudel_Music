import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
const axios = require('axios');

function Albums(){
    const [artistsToDesplay, setArtistsToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 
    useEffect(()=>{
        const ajax = async () =>{
        const artists = await axios.get(`/api/albums/${search}`);
        setArtistsToDesplay(artists.data)
        }
        ajax()
    },[search])

    return(
        <div className="all">
        <input className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
            <div className="allTarget">
            {
                artistsToDesplay.map((value,index)=>{
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