import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const MENU = gql`
  {
    items{
      id
      name
      type
      price
      photo
    }
  }
`;


const Menu =()=>{
    // const [items, setItems] = useState([]);
    const { loading, error, data } = useQuery(MENU);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

     return data.items.map(({ id, name, type, price, photo }) => (
        <div key={id}>
            <p>
                {name}: {price}:{type}:{photo}
            </p>
        </div>
    ));
}

export default Menu;