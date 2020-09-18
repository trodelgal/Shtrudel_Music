import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

function Songs(){
    const [songsToDesplay, setSongToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 

    useEffect(()=>{
        const ajax = async () =>{
        const songs = await axios.get(`/api/songs/${search}`);
        setSongToDesplay(songs.data)
        }
        ajax()
    },[search])
    return(
        <>
        <br/>
        <input onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
        <ListGroup className="my-2">
            {
                songsToDesplay.map((value,index)=>{
                    return(
                        <Link to={`/songs/${value.id}`}>
                            <ListGroup.Item> <span> icon </span> <span> {value.title} </span> <span>{value.length}</span></ListGroup.Item>
                        </Link>
                    )
                })
            }
        </ListGroup>
        </>
    )
}
export default Songs;