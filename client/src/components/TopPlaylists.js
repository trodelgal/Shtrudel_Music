import React, { useEffect, useState } from "react";

function TopPlaylists({topTwentyPlaylists}){
    return(
        <>
            <h2>Top 20 popular playlists</h2>
            <ol >
            {
                topTwentyPlaylists.map((value,index)=>{
                    return(
                        <li>
                            <div>
                                <b>Name:</b> {value.name} <br/>  <b>Number of user with this playlist:</b> {value.number_of_users_use_this_playlist}
                            </div>
                        </li>
                    )
                })
            }
            </ol>
        </>
    )
}
export default TopPlaylists;