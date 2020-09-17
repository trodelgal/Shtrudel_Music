import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
 
function Youtube ({youtubeLink}) {
    // console.log("linkToId "+ linkToId);
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    };
 
    const _onReady=(event) => {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
      }

    return(
        <YouTube videoId="_IO4NXbRaoY" opts={opts} onReady={_onReady} />
        ) 
 
}
export default Youtube;