import React from 'react';
import '../styles/landing.css';
class Landing extends React.Component {
    state = {  }
    render() { 
        return ( 
            <header id='showcase'>
                <div class='landing'>
                    <h1>Amazing Games TCG</h1>
                    <p>Crack some boxes, Protect your collection, We gotchu on alla dat</p>
                    <a class='button'>Browse Products</a>  
                </div>
            </header>
         );
    }
}
 
export default Landing;