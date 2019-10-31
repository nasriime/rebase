import axios from "axios";
import {FETCH_MENU} from '../constants/types';


export const fetchMenuData = () => dispatch =>{
    axios.get('/menu.json')
    .then( response =>
        dispatch({
            type: FETCH_MENU,
            payload: response.data
        })
    )
    .catch(error =>{
        console.log(error);
    })
}
