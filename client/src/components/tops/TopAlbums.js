import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';

function TopAlbums(){
    const [topTwentyAlbums, setTopTwentyAlbums] = useState([]);

    // fetch top twenty albums
    const getTopAlbums = async () => {
        try{
            const albums = await axios.get('/api/albums/all/top');
            setTopTwentyAlbums(albums.data); 
        }catch(e){
            console.error(e.message);
        } 
    } 

    useEffect(()=>{
        getTopAlbums()
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
        <h2>Top Albums</h2>
            <div className="top">
            <Carousel breakPoints={breakPoints}>
                {
                    topTwentyAlbums.map((value,index)=>{
                        return(
                            <Card key={index} style={{ width: '12rem',margin:'5px', textAlign: 'center',padding:'5px' }}>
                                <Link to={`/albums/${value.Album.id}`}><Card.Img variant="top" src={value.Album.coverImg} height="100px" width="180px" /></Link>
                                <Card.Title>{value.Album.name}</Card.Title>
                                <Card.Text>
                                    <div>{value.Album.createdAt.slice(0,10)}</div>
                                </Card.Text>
                            </Card>
                        )
                    })
                }
            </Carousel>
            </div>
        </>
    )
}
export default TopAlbums;