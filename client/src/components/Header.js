import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, NavDropdown,Nav, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './files/logo.png';
import '../App.css';


function Header({openArtistModal,openAlbumModal,openSongModal}){
    const name = localStorage.getItem('name');
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        window.location='/'
    }
    return(

    <Navbar expand="lg" bg="dark" variant="dark"  fixed="top">
        <Navbar.Brand><img src={logo} alt="logo" width="100" height="50"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link ><Link className="navLink" to={`/home`}>Home</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/songs`}>Songs</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/artists`}>Artists</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/playlists`}>Playlists</Link></Nav.Link>
                <Nav.Link><Link className="navLink" to={`/albums`}>Albums</Link></Nav.Link>
            </Nav>
            <Nav className="mr-auto">
                hello, {name}
            </Nav>
            <Nav onClick={logout}>
                <Button variant="outline-light">Logout</Button>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Header;