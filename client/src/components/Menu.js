import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import styled from 'styled-components';

const LIST_ITEMS = gql`
  query Items {
    items {
      id
      name
      type
      price
      photo
    }
  }
`;

const Menu =()=>{
    const { data, error, loading } = useQuery(LIST_ITEMS);
    if(error) console.log(error)
    return (
      <MenuWrapper>
        <div className="container">
          <AddWrapper className="d-flex justify-content-between">
            <h4>Menu</h4>
            <Link to='/add' className="btn btn-primary">Add menu item</Link>
          </AddWrapper>
          {loading && <h2>Loading...</h2>}
          <div className="row">
            {data && data.items.map(({id, name, type, price, photo})=>
                <div className="col-md-4" key={id}>
                  <Card>
                    <img src={photo} className="card-img-top" alt="..." />
                    <CardBody >
                      <div className="d-flex justify-content-between">
                        <p className="card-text">{type} course</p>
                        <p>{price} $</p>
                      </div>
                      <h5 className="card-title">{name}</h5>
                    </CardBody>
                  </Card>
                </div>
              )
            }
          </div>
        </div>
      </MenuWrapper>
    )
}

export default Menu;

const MenuWrapper = styled.div`
  background:#f0f0f7;
`;

const AddWrapper = styled.div`
  padding: 25px 0;
`;

const Card = styled.div`
  margin-bottom: 20px;
`;

const CardBody = styled.div`
  padding: 10px;
  background:#fff;
`;