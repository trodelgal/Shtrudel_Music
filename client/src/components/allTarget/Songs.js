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
    console.log(songsToDesplay);
    return(
        <div className="all">
        <input  className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
        <ListGroup style={{width:'150vh'}} className="my-2">
            {
                songsToDesplay.map((value,index)=>{
                    return(
                        <Link to={`/songs/${value.id}`}>
                            <ListGroup.Item  > 
                            <div style={{display:'flex', justifyContent:'space-around'}}> 
                                <div>icon</div>   
                                <div> {value.title} </div>
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
export default Songs;