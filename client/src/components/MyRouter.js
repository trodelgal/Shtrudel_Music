import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Main from './tops/Main';
import SingleSong from './single/SingleSong';
import SingleArtist from './single/SingleArtist';
import SinglePlaylist from './single/SinglePlaylist';
import SingleAlbum from './single/SingleAlbum';
import Header from "./Header";
import Playlists from './allTarget/Playlists';
import Artists from './allTarget/Artists';
import Albums from './allTarget/Albums';
import Songs from './allTarget/Songs';
import Image from 'react-bootstrap/Image';
import Login from "./Login";
import Register from "./Register";
import error from './files/error.png';

function MyRouter() {
 return (
 <Router>
    <Header/>
    <Switch>
        <Route exact path="/">
            <Login/>
        </Route>
        <Route exact path="/register">
            <Register/>
        </Route>
        <Route exact path="/home">
            <Main/>
        </Route>
        <Route exact path="/songs">
            <Songs/>
        </Route>
        <Route exact path="/artists">
            <Artists/>
        </Route>
        <Route exact path="/playlists">
            <Playlists/>
        </Route>
        <Route exact path="/albums">
            <Albums/>
        </Route>
        <Route exact path="/songs/:id">
            <SingleSong />
        </Route>
        <Route exact path="/artists/:id">
            <SingleArtist/>
        </Route>
        <Route exact path="/playlists/:id">
            <SinglePlaylist/>
        </Route>
        <Route exact path="/albums/:id">
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
