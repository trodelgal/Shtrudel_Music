import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
const axios = require('axios');

function SingleSong(){
    const [songData, setSongData] = useState([]) 
    const [createDate, setCreateDate]= useState('')
    let {id} = useParams();
    let body = '';

    const getSongData = async () =>{
        const song = await axios.get(`/api/single/song/${id}`);
        setSongData(song.data[0])
        setCreateDate(song.data[0].created_at)
    }

    useEffect(()=>{
        getSongData()
    },[])
    console.log(songData);
    function showLyrics(){
   
    }
 
    if (songData !== []){
        body = (
            <>
            <div>Name: {songData.title}</div>
            <div>iframe</div>
            <div>{songData.length}</div>
            <div>{createDate.slice(0,10)}</div>
            <div>Album: {songData.album}</div>
            <div>Artist: {songData.artist}</div>
            <div>Lyrics: {songData.lyrics}</div>
            </>
        )
    }

   
    return(
        <div id="singleSong">
         {body}
        </div>
    )
}

export default SingleSong;