import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import reducer from './reducer'
import middleware from './middleware';

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);