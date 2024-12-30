/**
 * Header.
 */

import React, { useState, useEffect } from "react";
import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";

export enum NavbarActiveKey {
  NONE = "",
  ABOUT = "About",
  BELIEFS = "Our Beliefs",
  SERMONS = "Sermons",
  CLASSES = "Classes",
  STUDY_GUIDE = "Study Guide",
  SMALL_GROUPS = "Small Groups",
  MINISTRY_TEAMS = "Ministry Teams",
  EVENTS = "Events",
  RIDES = "Rides",
  PRAYER = "Prayer",
}

interface HeaderProps {
  activeKey: NavbarActiveKey;
}

export const Header = (headerProps: HeaderProps) => {
  const [showExpandIcon, setShowExpandIcon] = useState(true);
  useEffect(() => {
    // Calculate navbar height after component is mounted (used for ministry team links)
    const navbarElement = document.querySelector(".goc-navbar") as HTMLElement;
    if (navbarElement) {
      let navbarHeight = navbarElement.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbarHeight}px`,
      );
    }
  }, []);
  return (
    <Navbar
      className={"goc-navbar"}
      bg={"white"}
      fixed={"top"}
      expand={"lg"}
      collapseOnSelect
    >
      <Container fluid>
        <Navbar.Brand href={"/"}>
          <Image src={"/assets/goc-header.svg"} alt={"Grace On Campus Logo"} />
        </Navbar.Brand>

        {showExpandIcon ? (
          <Navbar.Toggle
            className={"navbar-expand-icon"}
            aria-controls={"basic-navbar-nav"}
            onClick={() => setShowExpandIcon(false)}
          >
            <Image
              src={"/assets/hamburger-menu-icon-expand.svg"}
              alt={"Hamburger Menu Expand Icon"}
            />
          </Navbar.Toggle>
        ) : (
          <Navbar.Toggle
            className={"navbar-collapse-icon"}
            aria-controls={"basic-navbar-nav"}
            onClick={() => setShowExpandIcon(true)}
          >
            <Image
              src={"/assets/hamburger-menu-icon-collapse.svg"}
              alt={"Hamburger Menu Collapse Icon"}
            />
          </Navbar.Toggle>
        )}

        <Container fluid>
          <Navbar.Collapse className={"justify-content-end"}>
            <Nav activeKey={headerProps.activeKey}>
              <Nav.Item className={"px-2"}>
                <NavDropdown className={"header-navbar-link"} title={"About"}>
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"About"}
                    href={"/about"}
                  >
                    About Us
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"Our Beliefs"}
                    href={"/ourbeliefs"}
                  >
                    Our Beliefs
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

              <Nav.Item className={"px-2"}>
                <NavDropdown
                  className={"header-navbar-link"}
                  title={"Resources"}
                >
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"Sermons"}
                    href={"/sermons"}
                  >
                    Sermons
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"Classes"}
                    href={"/classes"}
                  >
                    Classes
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"Study Guide"}
                    href={"/study_guide"}
                  >
                    John Study Guide
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

              <Nav.Item className={"px-2"}>
                <NavDropdown
                  className={"header-navbar-link"}
                  title={"Get Involved"}
                >
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"Small Groups"}
                    href={"/smallgroups"}
                  >
                    Small Groups
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className={"px-2 header-navbar-link"}
                    eventKey={"Ministry Teams"}
                    href={"/ministry-teams"}
                  >
                    Ministry Teams
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

              <Nav.Item className={"px-2"}>
                <Nav.Link
                  className={"header-navbar-link"}
                  eventKey={"Events"}
                  href={"/events"}
                >
                  Events
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className={"px-2"}>
                <Nav.Link
                  className={"header-navbar-link"}
                  eventKey={"Rides"}
                  href={"/rides"}
                >
                  Rides
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"px-2"}>
                <Nav.Link
                  className={"header-navbar-link"}
                  eventKey={"Prayer"}
                  href={"/prayer/request"}
                >
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
