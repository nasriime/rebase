import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { BrowserRouter as Router, Route } from 'react-router-dom'
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
        <Router>
          <Route exact path="/" component={Menu} />
          <Route path="/add" component={AddMenuItem} />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;