import React, { useCallback, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileMusic } from 'react-bootstrap-icons';
import axios from 'axios';

function Songs(){
    const [songsToDesplay, setSongToDesplay] = useState([]) 
    const [search, setSearch] = useState('') 

    const getSongs =async () =>{
        try{
            const songs = await axios.get(`/api/songs/${search}`);
            setSongToDesplay(songs.data)
        }catch(e){
            console.error(e.message)
        }
    }

    useEffect(()=>{
        getSongs()
    },[search])

    return(
        <div className="all">
        <input  className="searchInput" onChange={(e) => setSearch(e.target.value)} placeholder="search"/>
        <ListGroup style={{width:'150vh'}} className="my-2">
            {
                songsToDesplay.map((value,index)=>{
                    return(
                        <Link key={index} to={`/songs/${value.id}`}>
                            <ListGroup.Item > 
                            <div style={{display:'flex', justifyContent:'space-between'}}> 
                                <div><FileMusic style={{color:'white'}}/></div>   
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