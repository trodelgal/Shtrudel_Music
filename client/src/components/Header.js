import React from 'react';
import { Link } from 'react-router-dom';
import logo from './files/logo.png'
import '../App.css'

function Header({title}){
    return(
        <header>
            <nav>
                <img src={logo} alt="logo" width="100" height="80"/>
                <h2 style={{color:'white'}}>{title}</h2>
                <ul className="navigationList">
                    <li><Link className="navLink" to={`/`}>Home</Link></li>
                    <li><Link className="navLink" to={`/songs`}>Songs</Link></li>
                    <li><Link className="navLink" to={`/artists`}>Artists</Link></li>
                    <li><Link className="navLink" to={`/playlist`}>Playlists</Link></li>
                    <li><Link className="navLink" to={`/albums`}>Album</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;