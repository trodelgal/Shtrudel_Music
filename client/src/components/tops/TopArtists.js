import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import network from '../../service/network';

function TopArtists(){
    const [topTenArtists, setTopTenArtists] = useState([]);

    // fetch top artists
    const getTopArtists = async () => {
        try{
            const artists = await network.get(`/api/artists/all/top`);
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
                                <Card key={index} style={{ width: '12rem',height:'10rem',margin:'5px', padding:'5px' }}>
                                    <Link to={`/artists/${value.Artist.id}`}><Card.Img style={{borderRadius:'50%'}} variant="top" src={value.Artist.coverImg} height="100px" width="180px" roundedCircle /></Link>
                                    <Card.Title style={{textAlign: 'center'}}>{value.Artist.name}</Card.Title>
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