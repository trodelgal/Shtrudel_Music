import React from 'react';

function Header(){
    return(
        <header 
        style={{
            backgroundColor: 'black',
            width:'100%',
            height: '220px',
        }}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTE-qgMPnsXTp5CSGJQ65aFsTVajO3s17yZUQ&usqp=CAU' className="basket-logo" alt="basket"  style={{height: '100px', marginTop:'10px'}}/>
            <h2 style={{color:'white'}}>Music_Streamer</h2>
        </header>
    )
}

export default Header;