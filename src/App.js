import React, { Component } from 'react';
import './App.css';

const API_KEY = '';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:null
        }
    };

    componentDidMount(){
        console.log('componentDidMount ran');
        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(json => {
                this.setState({user:json})

            })
    }

    render(){
        return <h1>{user.firstName}</h1>
    };
}

export default App;