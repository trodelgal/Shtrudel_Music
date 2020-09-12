import React, { useEffect, useState } from "react";
const axios = require('axios')
function Top(){
    const [topSongs, setTopSongs] = useState([]);
    const [topAtists, setTopArtists] = useState([]);

    const showTopSongs = async () => {
        if(topSongs[0]===undefined){
            const response = await axios.get(`/api/top_songs`);
            console.log(response.data);
            setTopSongs(response.data)
        }else{
            setTopSongs([])
        }
    };

    const showTopArtists = async () => {
        if(topAtists[0]===undefined){
            const response = await axios.get(`/api/top_artists`);
            console.log(response.data);
            setTopArtists(response.data)
        }else{
            setTopArtists([])
        }
    };


    return(
        <>
            <button onClick={showTopSongs}>The 20 top songs</button>
            <button onClick={showTopArtists}>The 20 artists</button>
            <ol >
            {
                topSongs.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                Name: {value.song_name}  Number of plays: {value.number_of_plays}
                            </div>
                        </li>
                    )
                })
            }
            </ol>
            <ol >
            {
                topAtists.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                Name: {value.name}  Number of plays: {value.number_of_songs}
                            </div>
                        </li>
                    )
                })
            }
            </ol>
            
        </>
    )
}
export default Top;