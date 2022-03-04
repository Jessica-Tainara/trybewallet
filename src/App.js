import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/store';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
