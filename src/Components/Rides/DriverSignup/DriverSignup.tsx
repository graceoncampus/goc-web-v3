/**
 * Driver signup higher order conditional rendering component.
 */

 import React, { useState } from 'react';
 import { DriverSignupThankYou } from './DriverSignupThankYou';
 import { DriverSignupForm } from './DriverSignupForm';
 
 export const DriverSignup = () => {
     const [
         riderSignupCompleted,
         setDriverSignupCompleted
     ] = useState(false);
 
     return (
         riderSignupCompleted
         ? <DriverSignupThankYou />
         : <DriverSignupForm setDriverSignupCompleted={setDriverSignupCompleted} />
     );
 }