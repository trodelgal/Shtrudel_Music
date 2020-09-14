import React, { useEffect, useState } from "react";

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
                                <b>Name:</b> {value.name}<br/>  <b>Number of plays:</b> {value.number_of_songs}
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