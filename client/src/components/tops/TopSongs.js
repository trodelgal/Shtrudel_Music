import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function TopSongs({topTwentySongs}){

    return(
        <>
            <h2>The top 20 most played songs</h2>
            <ol >
                {
                    topTwentySongs.map((value,index)=>{
                        return(
                            <li>
                                <div>
                                    <b>Name:</b> <Link to={`/songs/${value.song_id}`}>{value.song_name}</Link> <br/><b>Number of plays:</b> {value.number_of_plays}
                                </div>
                            </li>
                        )
                    })
                }
            </ol>
        </>
    )
}
export default TopSongs;