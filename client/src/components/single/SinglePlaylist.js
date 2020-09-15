import React from "react";
import { useParams } from 'react-router-dom';
   

function SinglePlaylist(props){
let {id} = useParams();
    return(
        <div>
            Single playlist- the playlist id = {id}
        </div>
    )
}

export default SinglePlaylist;