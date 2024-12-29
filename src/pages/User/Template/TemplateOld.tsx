/**
 * Template page to body between header and footer.
 */

import React from "react";
import { NavbarActiveKey, Header } from "../Header/Header";
import Footer from "components/Footer";
import { Container } from "react-bootstrap";
import Navbar from "components/Navbar";

interface TemplateProps {
  activeKey: string;
  body: React.ReactNode;
}

export const Template = (templateProps: TemplateProps) => {
  return (
    <div className={"page-container"}>
      <Navbar selectedNavItemName={"tesjt"} />

      <Container fluid className={"body-container"}>
        {templateProps.body}
      </Container>

      <Footer />
    </div>
  );
};
