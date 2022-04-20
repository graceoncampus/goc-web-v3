import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RiderSignup } from './Components/Rides/RiderSignup/RiderSignup';
import { DriverSignup } from './Components/Rides/DriverSignup/DriverSignup';
import { Landing } from './Components/Landing/Landing';

import './App.css';
import './css/bootstrap.scss';

const App = () => {
  return (
      <React.StrictMode>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Landing />}></Route>
                  <Route path="rides/rider/signup" element={<RiderSignup />}></Route>
                  <Route path="rides/driver/signup" element={<DriverSignup />}></Route>
              </Routes>
          </BrowserRouter>
      </React.StrictMode>
  );
};

export default App;
