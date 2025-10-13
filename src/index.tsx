import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({ reducer: rootReducer, devTools: true });

root.render(
  <React.Fragment>
      <Provider store={store}>
      <BrowserRouter basename={""}>
          <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);

reportWebVitals();


