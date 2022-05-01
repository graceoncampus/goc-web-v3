/**
 * Header.
 */

import React from 'react';
import { Button, Row, Col, Container, Image, Nav, Navbar } from 'react-bootstrap';

import './Header.scss'

export enum HeaderNavbarActiveKey {
    NONE = '',
    ABOUT = 'About',
    RESOURCES = 'Resources',
    SMALL_GROUPS = 'Small Groups',
    RIDES = 'Rides',
    PRAYER = 'Prayer'
}


interface HeaderProps {
    activeKey: HeaderNavbarActiveKey
}

export const Header = (headerProps: HeaderProps) => {
    return (
        <Navbar className={'goc-navbar'} bg={'white'} fixed={'top'} expand={'lg'} collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href={'/'}>
                    <Image
                        src={'/assets/goc-header.svg'}
                        // className={'d-inline-block align-top'}
                        alt={'Grace On Campus Logo'}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={'basic-navbar-nav'} />

                <Container fluid>
                    <Navbar.Collapse className={'justify-content-end'}>
                        <Nav activeKey={headerProps.activeKey}>
                            <Nav.Item className={'px-2'}>
                                <Nav.Link className={'header-navbar-link'} eventKey={'About'} href={'/'}>
                                    About
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={'px-2'}>
                                <Nav.Link className={'header-navbar-link'} eventKey={'Resources'} href={'/'}>
                                    Resources
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={'px-2'}>
                                <Nav.Link className={'header-navbar-link'} eventKey={'Small Groups'} href={'/'}>
                                    Small Groups
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={'px-2'}>
                                <Nav.Link className={'header-navbar-link'} eventKey={'Rides'} href={'/'}>
                                    Rides
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className={'px-2'}>
                                <Nav.Link className={'header-navbar-link'} eventKey={'Prayer'} href={'/'}>
                                    Prayer Requests
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Container>
        </Navbar>


    );
};