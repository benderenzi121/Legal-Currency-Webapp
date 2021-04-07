// import {v4 as uuidv4} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';
//thunk
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = 1;
    dispatch({
        type:SET_ALERT,
        payload:
            { msg, alertType, id }
    })

    setTimeout(() => dispatch({type:REMOVE_ALERT, payload: id}),timeout);
}