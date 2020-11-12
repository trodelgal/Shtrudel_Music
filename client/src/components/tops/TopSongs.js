import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';

function TopSongs(){
    const [topTwentySongs, setTopTwentySongs] = useState([]);
    // fetch top songs from DB
    const getTopSongs = async () => {
            try{
                const songs = await axios.get(`/api/songs/all/top`);
                setTopTwentySongs(songs.data); 
            }catch(e){
                console.error(e.message);
            }      
    } 
    useEffect(()=>{
        getTopSongs()
      },[])
      const breakPoints=[
          {width: 1 ,itemsToShow: 1},
          {width: 500 ,itemsToShow: 3},
          {width: 768 ,itemsToShow: 5},
          {width: 1200 ,itemsToShow: 7},
          {width: 1500 ,itemsToShow: 9}
        ]

    return(
        <>
            <h2>Top Songs</h2>
            <div className="top">
            <Carousel breakPoints={breakPoints}>
                {
                    topTwentySongs.map((value,index)=>{
                        return(
                            <Card key={index} style={{ width: '12rem',margin:'5px',  textAlign: 'center', padding:'5px' }}>
                                <Link to={`/songs/${value.Song.id}`}><Card.Img variant="top" src={value.Song.Album.coverImg} height="100px" width="180px" /></Link>
                                <Card.Body>
                                    <Card.Title>{value.Song.title}</Card.Title>
                                    <Card.Text>
                                        <div >{value.Song.length}</div>
                                        <span>{value.Song.Artist.artistName} | </span>
                                        <span>{value.Song.Album.albumName}</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </Carousel>
            </div>
        </>
    )
}

export default TopSongs;