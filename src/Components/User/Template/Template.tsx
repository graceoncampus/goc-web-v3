/**
 * Template page to body between header and footer.
 */

import React from "react";
import { Container } from "react-bootstrap";

import "./Template.scss";
import { HeaderNavbarActiveKey } from "pages/User/Header/Header";
import Header from "ui-components/Header";
import Navbar from "components/Navbar";

interface TemplateProps {
  activeKey: HeaderNavbarActiveKey;
  body: React.ReactNode;
}

export const Template = (templateProps: TemplateProps) => {
  return (
    <div className={"page-container"}>
      {/* <Header activeKey={templateProps.activeKey} /> */}
      <Navbar selectedNavItemName="Test" />

      <Container fluid className={"body-container"}>
        {templateProps.body}
      </Container>

      {/* <Footer /> */}
    </div>
  );
};
