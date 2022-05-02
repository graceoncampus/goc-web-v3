/**
 * Header.
 */

import React, { useState } from 'react';
import { Button, Row, Col, Container, Image, Nav, Navbar } from 'react-bootstrap';

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

const hamburgerMenuCollapsedIconImagePath = '/assets/hamburger-menu-icon-expand.svg';
const hamburgerMenuExpandedIconImagePath = '/assets/hamburger-menu-icon-collapse.svg';
const hamburgerMenuCollapsedIconAltText = 'Hamburger Menu Expand Icon';
const hamburgerMenuExpandedIconAltText = 'Hamburger Menu Collapse Icon';

export const Header = (headerProps: HeaderProps) => {
    const [isHamburgerMenuExpanded, setIsHamburgerMenuExpanded] = useState(false);
    const [hamburgerMenuIconImagePath, setHamburgerMenuIconImagePath] = useState(hamburgerMenuCollapsedIconImagePath);
    const [hamburgerMenuIconAltText, setHamburgerMenuIconAltText] = useState(hamburgerMenuExpandedIconAltText);

    return (
        <Navbar className={'goc-navbar'} bg={'white'} fixed={'top'} expand={'lg'} collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href={'/'}>
                    <Image
                        src={'/assets/goc-header.svg'}
                        alt={'Grace On Campus Logo'}
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls={'basic-navbar-nav'}>
                    <Image
                        src={hamburgerMenuIconImagePath}
                        alt={hamburgerMenuIconAltText}
                        onClick={(event) => {
                            if (isHamburgerMenuExpanded) {
                                setIsHamburgerMenuExpanded(false);
                                setHamburgerMenuIconImagePath(hamburgerMenuCollapsedIconImagePath);
                                setHamburgerMenuIconAltText(hamburgerMenuCollapsedIconAltText);
                            } else {
                                setIsHamburgerMenuExpanded(true);
                                setHamburgerMenuIconImagePath(hamburgerMenuExpandedIconImagePath);
                                setHamburgerMenuIconAltText(hamburgerMenuExpandedIconAltText);
                            }
                        }}
                    />
                </Navbar.Toggle>

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