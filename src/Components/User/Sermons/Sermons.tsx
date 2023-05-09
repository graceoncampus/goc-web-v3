/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';
import { Image } from "react-bootstrap";

import './Sermons.scss'
    
import { Template } from 'Components/User/Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';

export const Sermons = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.ABOUT} body={<SermonsBody />} />
    );
}

const SermonsBody = () => {
    return (
        <div className='text-center'>
            <h1 className="about-us"> <strong> Sermons </strong> </h1>
        </div>
    );
}