import React from 'react';
import '../styles/header.css';
class Header extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div >
                <nav className="navbar ml-auto navbar-expand-sm header row">
                    <ul className="navbar-nav  header col-sm"> 
                        <li className="nav-item col-sm-4"> 
                            <a className="nav-link nav-text" href="#"> 
                                Login/Create Account 
                            </a> 
                        </li> 
                        <li className="nav-item col-sm-4 header-center"> 
                            <a className="nav-link header-text" href="#"> 
                                Amazing Games TCG 
                            </a> 
                        </li> 
                        <li className="nav-item col-sm-4 header-right"> 
                            <a className="nav-link nav-text" href="#"> 
                                Login/Create Account 
                            </a> 
                        </li> 
                    </ul> 
            </nav> 
            </div>
         );
    }
}
 
export default Header;