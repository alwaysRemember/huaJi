import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { StoreContext } from 'redux-react-hook';
import store from './store';
import './app.scss';

class App extends Component {
  props: any;
  render() {
    return (
      <StoreContext.Provider value={store}>
        ;{this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default App;
