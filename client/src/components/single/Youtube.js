import React from 'react';
import YouTube from 'react-youtube';
 
function Youtube ({youtubeLink}) {

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      }
    };
 console.log(youtubeLink);
    const _onReady=(event) => {
        event.target.pauseVideo();
        event.target.nextVideo(()=>{

        })
        console.log(event.target);
      }

    return(
        <YouTube videoId={youtubeLink} opts={opts} onReady={_onReady} />
        ) 
 
}
export default Youtube;