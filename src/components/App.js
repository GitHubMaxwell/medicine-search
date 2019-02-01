import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import createAppStore from '../store/store';
import Dashboard from './Dashboard.js';
import Profile from './Profile';

const store = createAppStore();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: ''
    };
  }
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}
