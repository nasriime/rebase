import React from 'react';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import './App.scss';
import Menu from 'components/Menu';
import AddMenuItem from 'components/AddMenuItem';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Menu} />
      <Route path="/add-menu-item" component={AddMenuItem} />
    </Router>
  );
}

export default App;
