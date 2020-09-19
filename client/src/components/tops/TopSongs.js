import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';

function TopSongs(){
    const [topTwentySongs, setTopTwentySongs] = useState([]);
    const getTopSongs = async () => {
            try{
                const songs = await axios.get(`/api/top_songs`);
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
                            <Card style={{ width: '12rem',margin:'5px',  textAlign: 'center', padding:'5px' }}>
                                <Link to={`/songs/${value.id}`}><Card.Img variant="top" src={value.cover_img} height="100px" width="180px" /></Link>
                                <Card.Body>
                                    <Card.Title>{value.title}</Card.Title>
                                    <Card.Text>
                                        <div >{value.length}</div>
                                        <span>{value.artist_name} | </span>
                                        <span>{value.album_name}</span>
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

{/* <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel> */}
export default TopSongs;