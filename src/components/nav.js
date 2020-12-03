import React from 'react';
import '../styles/nav.css';
import '../styles/global.css';
class Nav extends React.Component {
    state = {  }
    render() { 
        return ( 
        <div class = 'container-fluid'>
           <nav class="navbar navbar-expand-sm mynav row"> 
                <ul class="navbar-nav col-sm"> 
                    <li class="nav-item col-lg-8 "> 
                        
                    </li> 
                    <li class="nav-item col-lg-3  nav-center"> 
                        <a class="nav-text " href="#"> 
                            View Products 
                        </a> 
                    </li> 
                    <li class="nav-item nav-right col-lg-1"> 
                        <a class="nav-text" href="#"> 
                            Settings 
                        </a> 
                    </li> 
                </ul> 
            </nav> 
        </div>
            
         );
    }
}
 
export default Nav;
