/**
 * Landing Page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderNavbarActiveKey } from 'Components/User/Header/Header';
import { Template } from 'Components/User/Template/Template';
import { EventCardList, EventCardListProps } from 'Components/EventCardList/EventCardList';

import './Landing.scss';

const LandingBody = () => {
    const navigate = useNavigate();

    {/* JUST TESTING RIGHT NOW, WILL PULL FROM DATABASE? */}
    const events = [
        {
            purpose: 'GET CONNECTED',
            text: 'SMALL GROUP',
            action: 'Sign up',
            link: '/rides/rider/signup',
        },
        {
            purpose: 'GET CONNECTED',
            text: 'RIDES',
            action: 'Sign up',
            link: '/rides/rider/signup',
        },
        {
            purpose: 'GET CONNECTED',
            text: 'SMALL GROUP',
            action: 'Sign up',
            link: '/rides/rider/signup',
        },{
            purpose: 'GET CONNECTED',
            text: 'SMALL GROUP',
            action: 'Sign up',
            link: '/rides/rider/signup',
        },
        {
            purpose: 'GET CONNECTED',
            text: 'RIDES',
            action: 'Sign up',
            link: '/rides/rider/signup',
        },
    ];

    return (
        <div id='container'>
            <div id='top-container'>
                <div id='rounded-blue-box'>
                    <div id='welcome-title'>Welcome to Grace on Campus!</div>
                    <div id='welcome-subtitle'>Fridays at 7pm, Rolfe 1200</div>
                    <button id='learn-more-btn' onClick={() => navigate('/rides/rider/signup')}>
                        Learn more
                    </button>
                </div>
                <div id='welcome-image-container'>
                    <img id='welcome-image' src='/images/LandingPhoto.png' alt='Grace on Campus'/>
                    <button id='facebook-btn' onClick={() => navigate('/rides/rider/signup')}>
                        Join our Facebook group
                    </button>
                </div>
            </div>
            <div id='bottom-container'>
                <div id='welcome-paragraph-container'>
                    <div id='welcome-paragraph-title'>Welcome!</div>
                    <div id='welcome-paragraph-body'>
                        Grace on Campus is a Christian fellowship at UCLA. As a ministry of Grace Community Church, 
                        we focus on Bible teaching, leadership training, evangelism, and discipleship. Join our Facebook 
                        group to attend our weekly Bible study, every Friday at 7pm.
                    </div>
                    <button id='what-we-believe-btn' onClick={() => navigate('/rides/rider/signup')}>
                        What we believe
                    </button>
                </div>
                <EventCardList events={events}/>
            </div>
        </div>
    )
}

export const Landing = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.NONE} body={<LandingBody />} />
    );
};
