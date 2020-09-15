import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function TopArtists({topTenArtists}){
    return(
        <>
            <h2>The 10 artists with the most songs</h2>
            <ol >
            {
                topTenArtists.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> <Link to={`/artist/${value.artist_id}`}>{value.name}</Link><br/>  <b>Number of plays:</b> {value.number_of_songs}
                            </div>
                        </li>
                    )
                })
            }
            </ol>
        </>
    )
}
export default TopArtists;