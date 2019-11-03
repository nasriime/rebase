import React, {useState, useEffect} from 'react';
import {Query} from "react-apollo";
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
    const [items, setItems] = useState([]);

    return (
        <div>
            <Query query={LIST_ITEMS}>
                {
                    ({loading, error, data}) =>{
                        if(loading) return <h2>Loading...</h2>
                        if(error) console.log(error)
                        console.log(data.items);
                        return <h1>test</h1>
                    }
                }
            </Query>
        </div>
    )
}

export default Menu;