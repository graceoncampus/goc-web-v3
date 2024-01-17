/* Landing Page
*/

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderNavbarActiveKey } from 'Components/User/Header/Header';
import { Template } from 'Components/User/Template/Template';
import { EventCardList, EventCardListProps } from 'Components/EventCardList/EventCardList';

import './Landing.scss';
import { Button, Row } from 'react-bootstrap';

const LandingBody = () => {
    const navigate = useNavigate();

    {/* JUST TESTING RIGHT NOW */ }
    const events = [
        {
            purpose: 'GET CONNECTED',
            text: 'SMALL GROUP',
            action: 'CHECK\'EM OUT',
            link: '/smallgroups',
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
        }, {
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
            <div className={'landing-rounded-blue-box'}>
                <div className={'landing-welcome-title'}>Welcome to Grace on Campus!</div>
                <div className={'landing-welcome-subtitle'}>Fridays at 7pm, Rolfe 1200</div>
                <a className={'landing-facebook-btn'} href={'https://www.facebook.com/groups/gocatucla'} target={'_blank'}>
                    Join our Facebook group
                </a>
            </div>
            <div className={'landing-welcome-image-container'}>
                <img className={'landing-welcome-image'} src='/images/LandingPhoto.png' alt='Grace on Campus' />
            </div>
            <div className={'landing-welcome-paragraph-container'}>
                <div className={'landing-welcome-paragraph-title'}>Welcome!</div>
                <div className={'landing-welcome-paragraph-body'}>
                    Grace on Campus is a Christian fellowship at UCLA. As a ministry of <a target={'_blank'} href={'https://www.gracechurch.org/'}>Grace Community Church</a>,
                    we focus on Bible teaching, leadership training, evangelism, and discipleship. We also provide <a href={'/rides/rider/signup'}>rides</a> to church every Sunday! Sign up for a ride to church and join our Facebook group to attend our weekly Bible study, every Friday at 7pm.
                </div>
                <Row className={'btn-container'}>
                    <Button onClick={() => navigate('/about')}>
                        About Us
                    </Button>
                    <Button onClick={() => navigate('/ourbeliefs')}>
                        What we believe
                    </Button>
                </Row>
            </div>
            <EventCardList events={events} />
        </div>
    )
}

export const Landing = () => {
    return (
        <Template activeKey={HeaderNavbarActiveKey.NONE} body={<LandingBody />} />
    );
};
