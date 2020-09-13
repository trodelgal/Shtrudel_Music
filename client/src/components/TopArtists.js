import React, { useEffect, useState } from "react";

function TopArtists({topTenArtists}){
    return(
            <ol >
            {
                topTenArtists.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> {value.name}  <b>Number of plays:</b> {value.number_of_songs}
                            </div>
                        </li>
                    )
                })
            }
            </ol>
    )
}
export default TopArtists;