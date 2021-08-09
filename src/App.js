import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { HomePage } from './pages/Home';
import { SimulatorPage } from './pages/Simulator';

import { Header } from './components/Header';

import './styles/global.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/simulator' exact component={SimulatorPage} />
      </Switch>
    </Router>
  );
}

export default App;
