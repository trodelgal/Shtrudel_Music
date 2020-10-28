import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import Youtube from './Youtube';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import network from '../../service/network';
import {songPlayed} from '../../service/AnalyticsManager';

function SingleSong(){
    const [songData, setSongData] = useState([]);
    const [youtubeId, setYoutubeId] = useState('');
    const [sideData, setSideData] = useState([]);
    const [showlyrics, setShowLyrics] = useState(false)

    let {id} = useParams();
    let queryId = useLocation().search.split("=")[1];
    let queryFrom = useLocation().search.split("=")[0];
    let query=  useLocation().search;

    const getSongData = useCallback(async () =>{
        try{
                const song = await network.get(`/api/single/song/${id}`);
                setSongData(song.data)
                setYoutubeId(getIdSong(song.data[0].youtube_link))
                if(queryFrom){
                    const side = await network.get(`/api/single/${queryFrom.slice(1)}/${queryId}`);
                    setSideData(side.data)
                }else{
                    const side = await network.get(`/api/top_songs`);
                    setSideData(side.data)
            }
        }catch(e){
            console.error(e.message)
        }
    },[])

    useEffect(()=>{
        getSongData()
    },[])

    useEffect(()=>{
        if(songData[0]){
            songPlayed(songData[0].title)
        }
    },[songData])
    
    function getIdSong (link){
       let video_id = link.split("v=")[1];
       const ampersandPosition = video_id.indexOf("&");
       if(ampersandPosition !== -1){
           video_id = video_id.substring(0, ampersandPosition)
       } 
       return video_id;
    }

    async function changeSong(value){
        const song = await network.get(`/api/single/song/${value.song_id}`);
        setSongData(song.data)
        setYoutubeId(getIdSong(song.data[0].youtube_link))
    }

    return(
        <div id="singleSong">
            <div id="iframe">
                <Youtube youtubeLink={youtubeId}/>
            </div> 
            <div id="side">
                {
                songData.map(value=>{
                    return(
                        <>
                            <div>Name: {value.title}</div>
                            <div>{value.length}</div>
                            <div>{value.created_at.slice(0,10)}</div>
                            <div>Album: {value.album}</div>
                            <div>Artist: {value.artist}</div>
                            <button onClick={()=>setShowLyrics(true)}>lyrics</button>
                            <Modal
                            size="sm"
                            show={showlyrics}
                            onHide={() => setShowLyrics(false)}
                            aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        song lyrics
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>  
                                    <div>
                                    {value.lyrics}
                                    </div> 
                                </Modal.Body>
                            </Modal>
                        </>
                    )
                    })  
                }
                <ListGroup style={{width:'90%', padding:'8%', color:'black'}} className="my-2">
                    {
                        sideData.map((value, index)=>{
                        let play = value.song_id===songData[0].id ?  '#343a40':'black';
                            return(
                                <ListGroup.Item > 
                                    <Link  style={{color:'white'}} to={`/songs/${value.song_id}${query}`}>
                                        <div onClick={()=>changeSong(value)} style={{display:'flex', justifyContent:'space-between', backgroundColor:play}}> 
                                            <div style={{alignSelf:'left'}}><img src={value.cover_img} width="30px" alt="pic"/></div>   
                                                <div >{value.song_name}</div>
                                                <div>{value.length}</div>
                                        </div>   
                                    </Link>
                                </ListGroup.Item  > 
                            )
                         
                        })
                    }
               
                </ListGroup>
            </div>
           
        </div>
    )
}

export default SingleSong;