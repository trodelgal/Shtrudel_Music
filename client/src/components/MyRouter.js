import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Main from './tops/Main';
import SingleSong from './single/SingleSong';
import SingleArtist from './single/SingleArtist';
import SinglePlaylist from './single/SinglePlaylist';
import SingleAlbum from './single/SingleAlbum';
import SimpleModal from "./Modal";
import Header from './Header';
import Playlists from './allTarget/Playlists';
import Artists from './allTarget/Artists';
import Albums from './allTarget/Albums';
import Songs from './allTarget/Songs';

function MyRouter() {
 return (
 <Router>
    <Switch>
        <Route exact path="/">
            <Header title='SHTRUDEL MUSIC' />
            <Main/>
        </Route>
        <Route exact path="/songs">
            <Header title='ALL SONGS' />
            <Songs/>
        </Route>
        <Route exact path="/artists">
            <Header title='ALL ARTISTS' />
            <Artists/>
        </Route>
        <Route exact path="/playlist">
            <Header title='ALL PLAYLISTS' />
            <Playlists/>
        </Route>
        <Route exact path="/albums">
            <Header title='ALL ALBUMS' />
            <Albums/>
        </Route>
        <Route exact path="/songs/:id">
            <Header title='SONG' />
            <SingleSong />
        </Route>
        <Route exact path="/artists/:id">
            <Header title='ARTIST' />
            <SingleArtist/>
        </Route>
        <Route exact path="/playlist/:id">
            <Header title='PLAYLIST' />
            <SinglePlaylist/>
        </Route>
        <Route exact path="/albums/:id">
            <Header title='ALBUM' />
            <SingleAlbum/>
        </Route>
        <Route>
           <h1>404</h1>
        </Route>
    </Switch>       
    <SimpleModal/>
 </Router>
 );
}
export default MyRouter;
