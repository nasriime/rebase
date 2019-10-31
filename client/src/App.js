import React from 'react';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.scss';
import Menu from 'components/Menu';
import AddMenuItem from 'components/AddMenuItem';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" component={Menu} />
        <Route path="/add-menu-item" component={AddMenuItem} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
