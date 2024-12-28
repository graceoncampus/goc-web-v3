/**
 * Header.
 */

import React, { useState, useEffect } from "react";
import { Container, Image, Nav, NavDropdown } from "react-bootstrap";

import Navbar from "components/Navbar";

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
      document.documentElement.style.setProperty("--navbar-height", `${navbarHeight}px`);
    }
  }, []);
  // return <Navbar></Navbar>;
};
