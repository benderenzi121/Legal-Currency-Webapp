import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

import axios from 'axios';

const Login = ({ login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({ ...formData,[e.target.name]:e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        
        
        await login(email,password);
        
        
        
    }
    // Redirect if logged in
    if (isAuthenticated){
      return <Redirect to ='home'/>
    }
    return (
      
        <div className='register__background'>
            
            <h1 className="large register__title">Sign In</h1>
      <p className="lead register__sub-title">
        <i className="fas fa-user " /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
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
        <input type="submit" className="btn btn-primary register__btn" value="Login" />
      </form>
      <p className="register__redirect">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
        </div>
    )
    };

    Login.propTypes ={
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
    }

    const mapStateToProps = state => ({
      isAuthenticated: state.auth.isAuthenticated
    })
    export default connect (mapStateToProps, { login}) (Login);

