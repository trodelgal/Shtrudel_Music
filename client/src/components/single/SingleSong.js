import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import Youtube from './Youtube';
import axios from 'axios';


function SingleSong(){
    const [songData, setSongData] = useState([]) 
    const [youtubeId, setYoutubeId] = useState('')
    const [sideData, setSideData] = useState([])
    const [fresh, setFresh] = useState('')
    
    let {id} = useParams();
    let queryId = useLocation().search.split("=")[1]
    let queryFrom = useLocation().search.split("=")[0]
    console.log(queryId);
    console.log(queryFrom.slice(1));
    console.log(songData);
  
    const getSongData = async () =>{
        const song = await axios.get(`/api/single/song/${id}`);
        setSongData(song.data)
        // setCreateDate(song.data[0].created_at)
        setYoutubeId(song.data[0].youtube_link)
        const side = await axios.get(`/api/single/${queryFrom.slice(1)}/${queryId}`);
        setSideData(side.data)
    }

    useEffect(()=>{
        getSongData()
    },[])
    
    function getIdSong (link){
       let video_id = link.split("v=")[1];
       const ampersandPosition = video_id.indexOf("&");
       if(ampersandPosition !== -1){
           video_id = video_id.substring(0, ampersandPosition)
       } 
       return video_id;
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
                        <div id="songDetails">
                            <div>Name: {value.title}</div>
                            <div>{value.length}</div>
                            <div>{value.created_at.slice(0,10)}</div>
                            <div>Album: {value.album}</div>
                            <div>Artist: {value.artist}</div>
                            <div>Lyrics: {value.lyrics}</div>
                        </div>
                    )
                })  
                }
                
                    {
                        sideData.map((value, index)=>{
                            return(
                                <ul>
                                    <li onClick={()=>{setYoutubeId(getIdSong(value.youtube_link))}}>{value.song_name}</li>
                                    <li>{value.length}</li>
                                </ul>
                            )
                         
                        })
                    }
               
              
            </div>
           
        </div>
    )
}

export default SingleSong;