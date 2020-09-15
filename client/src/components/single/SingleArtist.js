import React from "react";
import { useParams } from 'react-router-dom';
   

function SingleArtist(props){
let {id} = useParams();
    return(
        <div>
            Single artist- the artist id = {id}
        </div>
    )
}

export default SingleArtist;