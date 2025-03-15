import React from 'react';
import ReactDOM from 'react-dom/client';
import './pages/index.css';
import App from './pages/App.jsx';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);