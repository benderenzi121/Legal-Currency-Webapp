import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './components/header.jsx';
import Nav from './components/nav.jsx';
import Landing from './components/Pages/landing.jsx';
import Home from './components/Pages/home.jsx';

const API_KEY = '';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: null
        };
    };

    componentDidMount(){
        console.log('componentDidMount ran');
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ user: json });
            });
    }

    render(){
        return (
            <Fragment>
                {/* <Landing/> */}
                <Header/>
                <Nav/>
                <Home/>
            </Fragment>
        );
    };
}

export default App;