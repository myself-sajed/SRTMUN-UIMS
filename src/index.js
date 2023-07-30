import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
// import './boostrap.css';
// import './bootstrap.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const isDevelopment = process.env.REACT_APP_IS_DEVELOPMENT === 'development';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  isDevelopment ? (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  ) : (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
);


