import React from 'react';

function Footer({openModal}){
    return(
        <>
            <h1>HELP US TO GROW</h1>
            <button onClick={openModal}>add data</button>
        </>
    )
}

export default Footer;