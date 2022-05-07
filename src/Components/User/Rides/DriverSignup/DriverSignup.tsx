/**
 * Driver signup higher order conditional rendering component.
 */

import React, { useState } from 'react';
import { DriverSignupThankYou } from './DriverSignupThankYou';
import { DriverSignupForm } from './DriverSignupForm';

import { HeaderNavbarActiveKey } from '../../Header/Header'

import { Template } from '../../Template/Template';

 export const DriverSignup = () => {
     return (
         <Template activeKey={HeaderNavbarActiveKey.RIDES} body={<DriverSignupBody />}/>
     );
 }

 const DriverSignupBody = () => {
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