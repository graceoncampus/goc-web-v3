/**
 * Template page to body between header and footer.
 */

import React from "react";
import Footer from "components/Footer";
import Navbar, { NavbarActiveKey } from "components/Navbar";
import { Box } from "@chakra-ui/react";

interface TemplateProps {
  activeKey: NavbarActiveKey;
  body: React.ReactNode;
}

export const Template = (templateProps: TemplateProps) => {
  return (
    <Box>
      <Navbar selectedNavItemName={templateProps.activeKey} />

      <Box>{templateProps.body}</Box>

      <Footer />
    </Box>
  );
};
