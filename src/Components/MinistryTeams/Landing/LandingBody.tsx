/**
 * Landing page body.
 */

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { Header, HeaderNavbarActiveKey } from 'Components/MinistryTeams/Header/Header';

import './LandingBody.scss';

export const LandingBody = () => {
    return (
        <div className={'page-container'}>
            <Header activeKey={HeaderNavbarActiveKey.NONE}/>

            <Container className={'text-center body-container'} fluid>
                <Col>
                    <Row>
                    <span className={'ministry-teams-landing-header'}>
                        Thank you for serving!
                    </span>
                    </Row>

                    <Row>
                    <span className={'ministry-teams-landing-text'}>
                        Please use the links in the navigation bar to access the ministry team pages.
                    </span>
                    </Row>
                </Col>
            </Container>
        </div>
    );
}