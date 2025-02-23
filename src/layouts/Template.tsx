/**
 * Template page to body between header and footer.
 */

import Footer from "components/Footer";
import Navbar, { NavbarActiveKey } from "components/Navbar";
import { Box } from "@chakra-ui/react";

export interface TemplateProps {
  activeKey: NavbarActiveKey;
  children: React.ReactNode;
  disableTransparentNavbar?: boolean;
}

export const Template: React.FC<TemplateProps> = ({
  activeKey,
  children,
  disableTransparentNavbar = false,
}) => {
  return (
    <Box>
      <Navbar
        selectedNavItemName={activeKey}
        disableTransparent={disableTransparentNavbar}
      />
      <Box as={"main"}>{children}</Box>
      <Footer />
    </Box>
  );
};
