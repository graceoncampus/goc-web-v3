/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';

import { Template } from 'Components/User/Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';

export const AboutUs = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.ABOUT} body={<AboutUsBody />} />
    );
}

const AboutUsBody = () => {
    return (
        <div>hello</div>
    );
}