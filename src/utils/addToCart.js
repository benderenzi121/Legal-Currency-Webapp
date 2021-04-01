import axios from 'axios';
import {setAlert} from '../actions/alert';
import setAuthToken from '../utils/setAuthToken';

export const addToCart = async (productId,quantity) => {
   
    console.log('iran');
    const body = JSON.stringify({productId,quantity});
    console.log(body);
    const config={
        headers: {
            'content-type' : 'application/json'
        }
      }
    try{
        
        const res = await axios.post('http://localhost:5000/api/cart/add-to-cart', body, config);
        console.log(res.data);
        setAlert('success', 'success');
    }catch(err){
        console.log(err);
        setAlert({err}, 'danger');
    }
}