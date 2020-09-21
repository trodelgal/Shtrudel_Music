import React, { useCallback } from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FileMusic } from 'react-bootstrap-icons';
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
   

function SingleArtist(){
    const [songsOfArtist, setSongsOfArtist] = useState([]) 
    const [albumsOfArtist, setAlbumsOfArtist]= useState([])
    let {id} = useParams();
    let bodySongs = '';
    let bodyAlbums = '';

    const getSongsOfArtist = useCallback(async () =>{
        try{
            const songs = await axios.get(`/api/single/artist/${id}`);
            setSongsOfArtist(songs.data)
            const albums = await axios.get(`/api/single/artist/albums/${id}`);
            setAlbumsOfArtist(albums.data)
        }catch(e){
            console.error(e.message)
        }
    },[])
    useEffect(()=>{
        getSongsOfArtist()
    },[])

    console.log(songsOfArtist);
    console.log(albumsOfArtist);

  const breakPoints=[
        {width: 1 ,itemsToShow: 1},
        {width: 500 ,itemsToShow: 3},
        {width: 768 ,itemsToShow: 5},
        {width: 1200 ,itemsToShow: 7},
        {width: 1500 ,itemsToShow: 9}
      ]

    if (songsOfArtist[0] !== undefined){
        bodySongs = (
            <>
                <Image src={songsOfArtist[0].cover_img} width='100%' height='300px'/>
                <div className="single">
                <h1 className="singleTitile">{songsOfArtist[0].name}</h1>
                <h2>Songs</h2>
                {
                    songsOfArtist.slice(0,5).map(value=>{
                        return(
                            <ListGroup style={{width:'150vh'}} className="my-2">
                                    <Link to={`/songs/${value.song_id}?artist=${value.id}`}>
                                    <ListGroup.Item  > 
                                        <div style={{display:'flex', justifyContent:'space-between'}}> 
                                            <div><FileMusic style={{color:'white'}}/></div>   
                                            <div> {value.song_name} </div>
                                            <div>{value.length}</div>
                                        </div>                            
                                    </ListGroup.Item>
                                    </Link>
                                </ListGroup>
                        )
                    }) 
                }
                </div>
                </>
            )
            bodyAlbums = (
                <>
                <h2>Albums</h2>
                <Carousel breakPoints={breakPoints}>
                {
                    albumsOfArtist.map((value,index)=>{
                        return(
                            <Card style={{ width: '12rem',margin:'5px', textAlign: 'center' }}>
                                <Card.Title>{value.album_name}</Card.Title>
                                <Link to={`/albums/${value.album_id}`}>
                                    <Card.Img variant="top" src={value.album_image} height="100px" width="180px" />
                                    </Link>
                            </Card>
                        )
                    })
                }
            </Carousel>
                </>
            )
        }

   

    return(
        <div>
            {bodySongs}
            {bodyAlbums}
        </div>
    )
}

export default SingleArtist;