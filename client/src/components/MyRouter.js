import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './tops/Main';
import SingleSong from './single/SingleSong';
import SingleArtist from './single/SingleArtist';
import SinglePlaylist from './single/SinglePlaylist';
import SingleAlbum from './single/SingleAlbum';
import SimpleModal from "./SimpleModal";
import Playlists from './allTarget/Playlists';
import Artists from './allTarget/Artists';
import Albums from './allTarget/Albums';
import Songs from './allTarget/Songs';
import Image from 'react-bootstrap/Image';
import Login from './Login';
import Register from './Register';
import error from './files/error.png';

function MyRouter() {
    const token = localStorage.getItem('token')
    
 return (
 <Router>
    <Switch>
        <Route exact path="/">
            {
                token? <Main/>: <Login/>
            }
        </Route>
        <Route exact path="/register">
            <Register/>
        </Route>
        <Route exact path="/home">
        <SimpleModal/>
            <Main/>
        </Route>
        <Route exact path="/songs">
        <SimpleModal/>
            <Songs/>
        </Route>
        <Route exact path="/artists">
        <SimpleModal/>
            <Artists/>
        </Route>
        <Route exact path="/playlist">
        <SimpleModal/>
            <Playlists/>
        </Route>
        <Route exact path="/albums">
        <SimpleModal/>
            <Albums/>
        </Route>
        <Route exact path="/songs/:id">
        <SimpleModal/>
            <SingleSong />
        </Route>
        <Route exact path="/artists/:id">
        <SimpleModal/>
            <SingleArtist/>
        </Route>
        <Route exact path="/playlist/:id">
        <SimpleModal/>
            <SinglePlaylist/>
        </Route>
        <Route exact path="/albums/:id">
        <SimpleModal/>
            <SingleAlbum/>
        </Route>
        <Route>
           <Image src={error} width='100%' height='300px' fluid/>
        </Route>
    </Switch>       
 </Router>
 );
}
export default MyRouter;
