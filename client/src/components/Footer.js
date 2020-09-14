import React from 'react';

function Footer({openModal}){
    return(
        <footer>
            <h3>HELP US TO GROW</h3>
            <button style={{marginBottom: 10}} onClick={openModal}>add data</button>
        </footer>
    )
}

export default Footer;