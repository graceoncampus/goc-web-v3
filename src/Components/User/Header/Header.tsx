/**
 * Header.
 */

import React, { useState } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';

import './Header.scss'

export enum HeaderNavbarActiveKey {
    NONE = '',
    ABOUT = 'About',
    RESOURCES = 'Resources',
    SMALL_GROUPS = 'Small Groups',
    RIDES = 'Rides'
}


interface HeaderProps {
    activeKey: HeaderNavbarActiveKey
}

export const Header = (headerProps: HeaderProps) => {
    const [showExpandIcon, setShowExpandIcon] = useState(true);

    return (
        <Navbar className={'goc-navbar'} bg={'white'} fixed={'top'} expand={'lg'} collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href={'/'}>
                    <Image
                        src={'/assets/goc-header.svg'}
                        alt={'Grace On Campus Logo'}
                    />
                </Navbar.Brand>

                {
                    showExpandIcon
                    ?
                    <Navbar.Toggle
                        className={'navbar-expand-icon'}
                        aria-controls={'basic-navbar-nav'}
                        onClick={() => setShowExpandIcon(false)}
                    >
                        <Image
                            src={'/assets/hamburger-menu-icon-expand.svg'}
                            alt={'Hamburger Menu Expand Icon'}
                        />
                    </Navbar.Toggle>

                    :
                    <Navbar.Toggle
                        className={'navbar-collapse-icon'}
                        aria-controls={'basic-navbar-nav'}
                        onClick={() => setShowExpandIcon(true)}
                    >
                        <Image
                            src={'/assets/hamburger-menu-icon-collapse.svg'}
                            alt={'Hamburger Menu Collapse Icon'}
                        />
                    </Navbar.Toggle>
                }

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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Container>
        </Navbar>


    );
};