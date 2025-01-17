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
  disableTransparentNavbar?: Boolean;
}

export const Template: React.FC<TemplateProps> = ({
  activeKey,
  children,
  disableTransparentNavbar = false,
}) => {
  return (
    <Box>
      {disableTransparentNavbar ? (
        <Navbar selectedNavItemName={activeKey} disableTransparent />
      ) : (
        <Navbar selectedNavItemName={activeKey} />
      )}
      <Box as={"main"}>{children}</Box>
      <Footer />
    </Box>
  );
};
