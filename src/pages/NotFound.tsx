/**
 * 404 not found page for users.
 */

import { NavbarActiveKey } from "components/Navbar";
import { LoginTemplate } from "layouts/LoginTemplate";
import { Heading, Text } from "@chakra-ui/react";
import GOCButton from "components/GOCButton";

const NotFoundBody = () => (
  <div>
    <Heading as={"h2"} margin={".3rem"}>
      404
    </Heading>
    <Text textWrap={"nowrap"}>Page not found!</Text>
    <GOCButton href="/">Go Home</GOCButton>
  </div>
);

export const NotFound = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.NONE}>
      <NotFoundBody />
    </LoginTemplate>
  );
};
