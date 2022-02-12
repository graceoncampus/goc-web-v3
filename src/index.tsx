import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.scss';
import App from './App'; // Keep temporarily or linter will complain
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RiderSignup } from './Components/Rides/RiderSignup/RiderSignup';
import { Landing } from './Components/Landing/Landing';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="rides/rider/signup" element={<RiderSignup />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
