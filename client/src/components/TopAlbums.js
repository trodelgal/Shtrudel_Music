import React, { useEffect, useState } from "react";

function TopAlbums({topTwentyAlbums}){

    return(
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
    )
}
export default TopAlbums;