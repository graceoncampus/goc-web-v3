/**
 * Template page to body between header and footer.
 */

import React from "react";
import Footer from "components/Footer";
import Navbar, { NavbarActiveKey } from "components/Navbar";
import { Box } from "@chakra-ui/react";

export interface TemplateProps {
  activeKey: NavbarActiveKey;
  children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ activeKey, children }) => {
  return (
    <Box>
      <Navbar selectedNavItemName={activeKey} />

      <Box>{children}</Box>

      <Footer />
    </Box>
  );
};
