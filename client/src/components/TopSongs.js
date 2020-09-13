import React, { useEffect, useState } from "react";

function TopSongs({topTwentySongs}){

    return(
        <ol >
            {
                topTwentySongs.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> {value.song_name}  <b>Number of plays:</b> {value.number_of_plays}
                            </div>
                        </li>
                    )
                })
            }
        </ol>
    )
}
export default TopSongs;