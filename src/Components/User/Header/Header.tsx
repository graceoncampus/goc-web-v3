/**
 * Header.
 */

import { useState } from "react";
import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { trace } from "mobx";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "store/StoreContext";
import "./Header.scss";

export enum HeaderNavbarActiveKey {
  NONE = "",
  ABOUT = "About",
  RESOURCES = "Resources",
  SMALL_GROUPS = "Small Groups",
  RIDES = "Rides",
  PRAYER = "Prayer",
  SERMONS = "Sermons",
  EVENTS = "Events",
  LOGIN = "Login",
}

interface HeaderProps {
  activeKey: HeaderNavbarActiveKey;
}

export const Header = observer((headerProps: HeaderProps) => {
  const [showExpandIcon, setShowExpandIcon] = useState(true);
  const navigate = useNavigate();
  const userStore = useStore();
  console.log(userStore.name);

  return (
    <Navbar
      className={"goc-navbar"}
      bg={"white"}
      fixed={"top"}
      expand={"lg"}
      collapseOnSelect
    >
      <Container fluid>
        <Navbar.Brand>
          {/* using NavLink instead of Nav.Link to avoid refresh*/}
          <NavLink to={"/"}> 
            <Image
              src={"/assets/goc-header.svg"}
              alt={"Grace On Campus Logo"}
            />
          </NavLink>
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
              <Nav.Item>
                <NavDropdown
                  className={"px-2 header-navbar-link"}
                  title={"About"}
                >
                  <NavDropdown.Item>
                    <NavLink className={"header-navbar-link"} to={"/about"}>
                      About Us
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink
                      className={"header-navbar-link"}
                      to={"/ourbeliefs"}
                    >
                      Our Beliefs
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown
                  className={"px-2 header-navbar-link"}
                  title="Resources"
                >
                  <NavDropdown.Item>
                    <NavLink className={"header-navbar-link"} to={"/sermons"}>
                      Sermons
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink
                      className={"header-navbar-link"}
                      to={"/study_guide"}
                    >
                      John Study Guide
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
              <Nav.Item className={"px-2"}>
                <NavLink className={"p-2 header-navbar-link"} to={"/smallgroups"}>
                  Small Groups
                </NavLink>
              </Nav.Item>
              <Nav.Item className={"px-2"}>
                <NavLink className={"p-2 header-navbar-link"} to={"/events"}>
                  Events
                </NavLink>
              </Nav.Item>
              <Nav.Item className={"px-2"}>
                <NavLink className={"p-2 header-navbar-link"} to={"/rides"}>
                  Rides
                </NavLink>
              </Nav.Item>
              <Nav.Item className={"px-2"}>
                <NavLink
                  className={"p-2 header-navbar-link"}
                  to={"/prayer/request"}
                >
                  Prayer Requests
                </NavLink>
              </Nav.Item>
              <Nav.Item className={"px-2"}>
                {!userStore.name ? (
                  <NavLink className={"p-2 header-navbar-link"} to={"/login"}>
                    Login
                  </NavLink>
                ) : (
                  <Nav.Item>
                    <NavDropdown
                      className={"px-2 header-navbar-link"}
                      title={userStore.name}
                    >
                      <NavDropdown.Item
                        className={"header-navbar-link"}
                        eventKey={"Login"}
                        onClick={() => {
                          userStore.logout();
                        }}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Item>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
});
