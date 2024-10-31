/**
 * Header.
 */

import React, { useState } from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';

import './Header.scss'

import { MINISTRY_TEAMS_LIST } from 'Constants/MinistryTeams';
// import { handleLogout } from 'Auth/Utilities/HandleLogout';

export enum HeaderNavbarActiveKey {
    NONE = '',
    RIDES = 'Rides',
    PRAYER = 'Prayer',
    SMALL_GROUPS = 'Small Groups'
}

interface HeaderProps {
    activeKey: HeaderNavbarActiveKey
}

export const Header = (headerProps: HeaderProps) => {
    const [showExpandIcon, setShowExpandIcon] = useState(true);

    const navbarLinks = MINISTRY_TEAMS_LIST.map((ministryTeamName: string, index: number) => {
        const ministryTeamHref = `/ministry_teams/${ministryTeamName.toLowerCase()}`;

        return (
            <Nav.Item className={'px-2'}>
                <Nav.Link key={index} className={'header-navbar-link'} eventKey={ministryTeamName} href={ministryTeamHref}>
                    {ministryTeamName}
                </Nav.Link>
            </Nav.Item>
        );
    });

    return (
        <Navbar className={'goc-navbar'} bg={'white'} fixed={'top'} expand={'lg'} collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href={'/ministry_teams'}>
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
                            {navbarLinks}
                        </Nav>

                        <Button className={'navbar-logout-button'} onClick={(event: any) => {
                            event.preventDefault();

                            // handleLogout();
                        }}>
                            SIGN OUT
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Container>
        </Navbar>
    );
};