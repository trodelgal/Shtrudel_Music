import React, { useEffect, useState } from "react";

function TopAlbums({topTwentyAlbums}){

    return(
        <>
        <h2>The 20 most playing albums</h2>
        <ol >
            {
                topTwentyAlbums.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> {value.name}
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