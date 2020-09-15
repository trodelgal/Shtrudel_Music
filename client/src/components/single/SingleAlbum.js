import React from "react";
import { useParams } from 'react-router-dom';
   

function SingleAlbum(props){
let {id} = useParams();
    return(
        <div>
            Single album- the album id = {id}
        </div>
    )
}

export default SingleAlbum;