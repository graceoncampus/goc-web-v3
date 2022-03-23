/**
 * Header.
 */

import React from 'react';
import { Button, Row, Col, Container, Image } from 'react-bootstrap';

import './Header.scss'

interface HeaderProps {
    headerBackgroundImagePath: string
}

export const Header = (headerProps: HeaderProps) => {
    return (
        <Container style={{
            backgroundImage: `url(${headerProps.headerBackgroundImagePath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} className={'header'} fluid>
            <Row>
                <Col md={6}>
                    <Image className={'goc-header'} src={'/assets/goc-header.png'} alt={'GOC'} />
                </Col>

                <Col md={6}>
                    <Row className={'align-self-end'}>
                        <Col>
                            <a className={'nav-link'} href={''}>About</a>
                        </Col>

                        <Col>
                            <a className={'nav-link'} href={''}>Resources</a>
                        </Col>

                        <Col>
                            <a className={'nav-link'} href={''}>Small Groups</a>
                        </Col>

                        <Col>
                            <a className={'nav-link'} href={''}>Rides</a>
                        </Col>

                        <Col>
                            <a className={'nav-link'} href={''}>Login</a>
                        </Col>

                        <Col>
                            <Button variant={'primary'} className={'account-sign-up-button'}>
                                SIGN UP
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};