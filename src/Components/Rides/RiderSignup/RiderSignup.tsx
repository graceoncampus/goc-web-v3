/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';
import { RiderSignupThankYou } from './RiderSignupThankYou';
import { RiderSignupForm } from './RiderSignupForm';

export const RiderSignup = () => {
    const [
        riderSignupCompleted,
        setRiderSignupCompleted
    ] = useState(false);

    return (
        riderSignupCompleted
        ? <RiderSignupThankYou />
        : <RiderSignupForm setRiderSignupCompleted={setRiderSignupCompleted} />
    );
}