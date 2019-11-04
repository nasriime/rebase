import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import Menu from './components/Menu';
import AddMenuItem from './components/AddMenuItem';


const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000',
  headers: {
    "keep-alive": "true"
  }
})

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Header>
            <h5>CAFE REACT</h5>
          </Header>
          <Router>
            <Route exact path="/" component={Menu} />
            <Route path="/add" component={AddMenuItem} />
          </Router>
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;

const Header = styled.header`
  padding: 4px 30px;
`;