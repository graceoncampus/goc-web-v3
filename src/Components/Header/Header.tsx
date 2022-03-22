/**
 * Header.
 */

import React from 'react';
import { Button, Row, Col, Container} from 'react-bootstrap';

import './Header.scss'

export const Header = () => {
    return (
        <Container>
            <img className={'goc-header'} src={'./assets/goc-header.png'} alt={'GOC'}></img>
            <Row className={'nav-bar'}>
                <Col>
                    <a className={'nav-link'} href={''}>About</a>
                </Col>
                <Col>
                    <a className={'nav-link'} href={''}>Resources</a>
                </Col>
                <Col xs={2}>
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
        </Container>
    );
};