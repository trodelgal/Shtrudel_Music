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
        <>
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search albums"/>
            <div className="allTarget">
            {
                artistsToDesplay.map((value,index)=>{
                    return(
                        <Card style={{ width: '18rem',margin:'5px', textAlign: 'center' }}>
                            <Card.Title><b>{value.name}</b></Card.Title>
                            <Link to={`/albums/${value.id}`}><Card.Img variant="top" src={value.cover_img} height="100px" width="180px" /></Link>
                            <Card.Title>
                                    {value.created_at.slice(0,10)}
                            </Card.Title>
                        </Card>
                    )
                })
            }
            </div>
        </>
    )
}
export default Albums;