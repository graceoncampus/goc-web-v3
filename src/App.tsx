import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RiderSignup } from './Components/Rides/RiderSignup/RiderSignup';
import { DriverSignup } from './Components/Rides/DriverSignup/DriverSignup';
import { PrayerForm } from './Components/Prayer/PrayerForm';  
import { Landing } from './Components/Landing/Landing';

import './App.css';
import './css/bootstrap.scss';

/**
 * Curse Amplify's routing - we need to add trailing slashes to our paths for now!
 * src: https://github.com/aws-amplify/amplify-hosting/issues/97
 * Example query param string:
 * [❌] /rides/rider/signup?eventId=EVENT_ID
 * [✔] /rides/rider/signup/?eventId=EVENT_ID
 */
const App = () => {
  return (
      <React.StrictMode>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Landing />}></Route>
                  <Route path='/rides/rider/signup' element={<RiderSignup />}></Route>
                  <Route path='/rides/driver/signup' element={<DriverSignup />}></Route>
                  <Route path='/prayer/request' element={<PrayerForm/>}></Route>
              </Routes>
          </BrowserRouter>
      </React.StrictMode>
  );
};

export default App;
