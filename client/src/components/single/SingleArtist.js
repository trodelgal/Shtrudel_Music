import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card} from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
   

function SingleArtist(){
    const [songsOfArtist, setSongsOfArtist] = useState([]) 
    const [albumsOfArtist, setAlbumsOfArtist]= useState([])
    let {id} = useParams();
    let bodySongs = '';
    let bodyAlbums = '';

    const getSongsOfArtist = async () =>{
        const songs = await axios.get(`/api/single/artist/${id}`);
        setSongsOfArtist(songs.data)
        const albums = await axios.get(`/api/single/artist/albums/${id}`);
        setAlbumsOfArtist(albums.data)
    }
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
                {/* <img src={songsOfArtist[0].cover_img} alt="artist image"/> */}
                <h1>{songsOfArtist[0].name}</h1>
                <h2>Songs</h2>
                {
                    songsOfArtist.map(value=>{
                        return(
                            <ListGroup style={{width:'150vh', marginLeft:'15%'}} className="my-2">
                                    <Link to={`/songs/${value.song_id}?artist=${value.id}`}>
                                    <ListGroup.Item  > 
                                        <div style={{display:'flex', justifyContent:'space-around'}}> 
                                            <div>icon</div>   
                                            <div> {value.song_name} </div>
                                            <div>{value.length}</div>
                                        </div>                            
                                    </ListGroup.Item>
                                    </Link>
                                </ListGroup>
                        )
                    }) 
                }
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
                                <Card.Title><b>{value.album_name}</b></Card.Title>
                                <Link to={`/albums/${value.id}`}>
                                    <Card.Img variant="top" src={value.cover_img} height="100px" width="180px" />
                                    </Link>
                                {/* <Card.Text>
                                    <div>{value.artist_name}</div>
                                    <div>{value.created_at.slice(0,10)}</div>
                                </Card.Text> */}
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