/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';
import { RiderSignupThankYou } from './RiderSignupThankYou';
import { RiderSignupForm } from './RiderSignupForm';
import { Template } from 'Components/Template/Template';

export const RiderSignup = () => {
    return (
        <Template headerBackgroundImagePath={'/images/RidesBackgroundHeader.png'} body={<RiderSignupBody />} />
    );
}

const RiderSignupBody = () => {
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