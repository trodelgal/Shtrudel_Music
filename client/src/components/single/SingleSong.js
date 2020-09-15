import React from "react";
import { useParams } from 'react-router-dom';
   

function SingleSong(props){
let {id} = useParams();
    return(
        <div>
            Single song- the song id = {id}
        </div>
    )
}

export default SingleSong;