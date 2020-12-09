import React from 'react';
import '../styles/header.css';

const Header = () => (
    <div >
        <nav class="navbar ml-auto navbar-expand-sm header row">
            <ul class="navbar-nav  header col-sm"> 
                <li class="nav-item col-sm-4"> 
                    <a class="nav-link nav-text" href="#"> 
                        Login/Create Account 
                    </a> 
                </li> 
                <li class="nav-item col-sm-4 header-center"> 
                    <a class="nav-link header-text" href="#"> 
                        Amazing Games TCG 
                    </a> 
                </li> 
                <li class="nav-item col-sm-4 header-right"> 
                    <a class="nav-link nav-text" href="#"> 
                        Login/Create Account 
                    </a> 
                </li> 
            </ul> 
        </nav>
    </div>
);

export default Header;