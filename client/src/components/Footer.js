import React from 'react';

function Footer({openModal}){
    return(
        <footer>
            <h3>HELP @ TO GROW</h3>
            <button style={{marginBottom: 10}} onClick={openModal}>add Music</button>
        </footer>
    )
}

export default Footer;