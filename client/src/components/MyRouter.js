import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Main from './tops/Main';
import SingleSong from './single/SingleSong';
import SingleArtist from './single/SingleArtist';
import SinglePlaylist from './single/SinglePlaylist';
import SingleAlbum from './single/SingleAlbum';
import SimpleModal from "./SimpleModal";
import Header from './Header';
import Playlists from './allTarget/Playlists';
import Artists from './allTarget/Artists';
import Albums from './allTarget/Albums';
import Songs from './allTarget/Songs';

function MyRouter() {
 return (
 <Router>
     <SimpleModal/>
    <Switch>
        <Route exact path="/">
            <Main/>
        </Route>
        <Route exact path="/songs">
            <Songs/>
        </Route>
        <Route exact path="/artists">
            <Artists/>
        </Route>
        <Route exact path="/playlist">
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
        <Route exact path="/playlist/:id">
            <SinglePlaylist/>
        </Route>
        <Route exact path="/albums/:id">
            <SingleAlbum/>
        </Route>
        <Route>
           <h1>404</h1>
        </Route>
    </Switch>       
    {/* <SimpleModal/> */}
 </Router>
 );
}
export default MyRouter;
