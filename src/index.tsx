import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.scss';
import App from './App'; // Keep temporarily or linter will complain
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RiderSignup } from './Components/Rides/RiderSignup/RiderSignup';
import { DriverSignup } from './Components/Rides/DriverSignup/DriverSignup';
import { Landing } from './Components/Landing/Landing';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="rides/rider/signup" element={<RiderSignup />}></Route>
        <Route path="rides/driver/signup" element={<DriverSignup />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
