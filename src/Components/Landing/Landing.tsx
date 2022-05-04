/**
 * Landing Page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderNavbarActiveKey } from 'Components/Header/Header';
import { Template } from 'Components/Template/Template';
import { EventCardList, EventCardListProps } from 'Components/EventCardList/EventCardList';

import './Landing.scss';

const LandingBody = () => {
    const navigate = useNavigate();

    {/* JUST TESTING RIGHT NOW */}
    const events = [
        {
            purpose: 'GET CONNECTED',
            text: 'SMALL GROUP',
            action: 'CHECK\'EM OUT',
            link: '/rides/rider/signup',
        },
        {
            purpose: 'GET CONNECTED',
            text: 'RIDES',
            action: 'SIGN UP NOW',
            link: '/rides/rider/signup',
        },
        {
            purpose: 'GET CONNECTED',
            text: 'UPCOMING EVENTS',
            action: 'TAKE A LOOK',
            link: '/rides/rider/signup',
        },{
            purpose: 'GET CONNECTED',
            text: 'PRAYER REQUESTS',
            action: 'LOREUM IPSUM',
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
        <div className={'landing-container'}>
            <div className={'landing-top-container'}>
                <div className={'landing-rounded-blue-box'}>
                    <div className={'landing-welcome-title'}>Welcome to Grace on Campus!</div>
                    <div className={'landing-welcome-subtitle'}>Fridays at 7pm, Rolfe 1200</div>
                    <button className={'landing-learn-more-btn'} onClick={() => navigate('/rides/rider/signup')}>
                        Learn more
                    </button>
                </div>
                <div className={'landing-welcome-image-container'}>
                    <img className={'landing-welcome-image'} src='/images/LandingPhoto.png' alt='Grace on Campus'/>
                    <button className={'landing-facebook-btn'} onClick={() => navigate('/rides/rider/signup')}>
                        Join our Facebook group
                    </button>
                </div>
            </div>
            <div className={'landing-bottom-container'}>
                <div className={'landing-welcome-paragraph-container'}>
                    <div className={'landing-welcome-paragraph-title'}>Welcome!</div>
                    <div className={'landing-welcome-paragraph-body'}>
                        Grace on Campus is a Christian fellowship at UCLA. As a ministry of Grace Community Church, 
                        we focus on Bible teaching, leadership training, evangelism, and discipleship. Join our Facebook 
                        group to attend our weekly Bible study, every Friday at 7pm.
                    </div>
                    <button className={'landing-what-we-believe-btn'} onClick={() => navigate('/rides/rider/signup')}>
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
