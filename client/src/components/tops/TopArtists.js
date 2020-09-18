import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';

function TopArtists(){
    const [topTenArtists, setTopTenArtists] = useState([]);

    const getTopArtists = async () => {
        try{
            const artists = await axios.get(`/api/top_artists`);
            setTopTenArtists(artists.data); 
        }catch(e){
            console.error(e.message);
        }
        
    } 
    useEffect(()=>{
        getTopArtists()
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
            <h2>Top Artists</h2>
            <div className="top">
                <Carousel breakPoints={breakPoints}>
                    {
                        topTenArtists.map((value,index)=>{
                            return(
                                <Card style={{ width: '12rem',margin:'5px' }}>
                                    <Link to={`/artists/${value.id}`}><Card.Img style={{borderRadius:'50%'}} variant="top" src={value.cover_img} height="100px" width="180px" roundedCircle /></Link>
                                    <Card.Title style={{textAlign: 'center'}}><b>{value.name}</b></Card.Title>
                                </Card>
                            )
                        })
                    }
                </Carousel>
            </div>
        </>
    )
}
export default TopArtists;