/**
 * 404 not found page for ministry teams
 */

import { NavbarActiveKey } from "components/Navbar";
import { LoginTemplate } from "layouts/LoginTemplate";
import { Heading, Text } from "@chakra-ui/react";
import GOCButton from "components/GOCButton";

export const NotFoundPage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.NONE}>
      <NotFoundBody />
    </LoginTemplate>
  );
};

const NotFoundBody = () => (
  <div>
    <Heading as={"h2"} margin={".3rem"}>
      404
    </Heading>
    <Text textWrap={"nowrap"}>Page not found!</Text>
    <GOCButton href="/">Go Home</GOCButton>
  </div>
);
