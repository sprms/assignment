import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes'
import axios from 'axios';
import {restApiSettings} from './config/api'
import configureStore from './store/index';
import reducer from './reducer/index'
import { Provider } from 'react-redux'

const store = configureStore(reducer)

axios.defaults.baseURL = restApiSettings.baseURL;
axios.defaults.withCredentials = true;

ReactDOM.render(
  <Provider store={store}>
  <Routes />
  </Provider>,
  document.getElementById('root')
);
