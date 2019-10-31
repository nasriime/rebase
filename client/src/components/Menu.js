import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";

const Menu =()=>{
    const content = useSelector(state => state.menuReducer.data); 
    const dispatch = useDispatch(); 
    const [items, setItems] = useState([]);

    // useEffect(() => {
        
    //     return () => {
            
    //     };
    // }, [])

    return (
        <div>

        </div>
    )
}

export default Menu;