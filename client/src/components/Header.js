import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavDropdown,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './files/logo.png';
import '../App.css';


function Header({openArtistModal,openAlbumModal,openSongModal}){
    return(

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"  fixed="top">
        <Navbar.Brand><img src={logo} alt="logo" width="100" height="50"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link ><Link className="navLink" to={`/`}>Home</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/songs`}>Songs</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/artists`}>Artists</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/playlist`}>Playlists</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/albums`}>Albums</Link></Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown title="HELP US TO GROW" id="collasible-nav-dropdown">
                    <NavDropdown.Item > <span onClick={()=>openArtistModal()}>Add Artist</span></NavDropdown.Item>
                    <NavDropdown.Item onClick={openAlbumModal}>Add Album</NavDropdown.Item>
                    <NavDropdown.Item onClick={openSongModal}>Add Song</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Header;