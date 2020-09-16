import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function TopAlbums({topTwentyAlbums}){

    return(
        <>
        <h2>Top 20 most played albums</h2>
        <ol >
            {
                topTwentyAlbums.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> <Link to={`/albums/${value.album_id}`}>{value.name}</Link>
                            </div>
                        </li>
                    )
                })
            }
        </ol>
        </>
    )
}
export default TopAlbums;