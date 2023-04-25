/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';
import { Image } from "react-bootstrap";

import './AboutUs.scss'
    
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
            <Image fluid rounded src={'/images/AboutUsBackground.png'}/>
            <h1 className="about-us"> <strong> Sermons </strong></h1>
        </div>
    );
}