/**
 * Template page to body between header and footer.
 */

import React from "react";
import { HeaderNavbarActiveKey, Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Container } from "react-bootstrap";

interface TemplateProps {
  activeKey: HeaderNavbarActiveKey;
  body: React.ReactNode;
}

export const Template = (templateProps: TemplateProps) => {
  return (
    <div className={"page-container"}>
      <Header activeKey={templateProps.activeKey} />

      <Container fluid className={"body-container"}>
        {templateProps.body}
      </Container>

      <Footer />
    </div>
  );
};
