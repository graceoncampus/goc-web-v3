/**
 * Rider signup higher order conditional rendering component.
 */

import React, { useState } from 'react';

import { Button } from 'react-bootstrap'

import { Template } from 'Components/User/Template/Template';
import { HeaderNavbarActiveKey } from '../Header/Header';

export const AboutUs = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.ABOUT} body={<AboutUsBody />} />
    );
}

const AboutUsBody = () => {
    return (
        <div className='text-center'>
            <h1>About Us</h1>
            <h2>Who We Are</h2>
            <p>
            We are a ministry of Grace Community Church on the UCLA campus. We are a student group that exists to glorify God and spread a passion for His glory by making disciples, shepherding them to value Jesus Christ above all else, and training up the next generation of Christian leaders. In other words, we exist to edify and equip the saints, evangelize the lost, and exalt the Lord Jesus Christ in all things.
            </p>
            <p>
            Every Friday night we gather for a time of singing, hearing God's Word taught, and fellowship. It is during these weekly large group meetings that GOC comes together corporately to worship our great God.
            </p>
            <Button variant='dark'>
                Welcome Packet
            </Button>
        </div>
    );
}