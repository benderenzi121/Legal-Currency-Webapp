import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {setAlert} from '../../actions/alert';

const Register = (props) => {
    const [formData, setFormData] =useState({
        firstName:'',
        email:'',
        password:'',
        password2:''
    });

    const {firstName, email, password, password2} = formData;

    const onChange = e => setFormData({ ...formData,[e.target.name]:e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        if(password != password2) {
            props.setAlert('passwords do not match')
        }
        else{
            // const newUser = {
            //     firstName,
            //     email,
            //     password
            // }

            // try{
            //     const config = {
            //         headers: {
            //             'content-type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('http://localhost:5000/api/users',body,config);
            //     console.log(res.data);
            // }
            // catch(err) {
            //     console.log(err.response.data);
            // }
        }
    }
    return (
        <Fragment>
            
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="firstName"
            value={firstName}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Sign Up</Link>
      </p>
        </Fragment>
    )
    };

    export default connect(null, { setAlert })(Register);

