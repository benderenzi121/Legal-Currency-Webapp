import axios from 'axios';
import {setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//Register User
export const register = ({name, email, password}) =>  async dipsatch => {
  const config={
    headers: {
        'content-type' : 'application/json'
    }
  }

  const body = JSON.stringify({name, email,password });


  try{
    const res = await axios.post('http://localhost:5000/api/users', body, config);
    console.log(res.data);
    let test = res.data;
    dipsatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    });

  } catch(err){
      console.log(err);
    const errors = err.response.data.errors;
    if(errors) {
        errors.forEach(error => dipsatch(setAlert(error.msg, 'danger')));
    }
    dipsatch({
        type:REGISTER_FAIL
    });
  }
}