import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from "graphql-tag"

const LIST_ITEMS = gql`
  query Items {
    items {
      id
      name
      type
      photo
    }
  }
`;

const Menu =()=>{
    const { data, error, loading } = useQuery(LIST_ITEMS);
    
    if(loading) return <h2>Loading...</h2>
    if(error) console.log(error)
    return (
        <div>
          {console.log(data.items)}
          <h1>test</h1>      
        </div>
    )
}

export default Menu;