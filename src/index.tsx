import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.scss';
import App from './App'; // Keep temporarily or linter will complain

import { RiderSignup } from "./Components/Rides/RiderSignup/RiderSignup";

ReactDOM.render(
  <React.StrictMode>
    <RiderSignup />
  </React.StrictMode>,
  document.getElementById('root')
);
