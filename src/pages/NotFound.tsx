import { NavbarActiveKey } from "@/components/Navbar";
import { LoginTemplate } from "@/layouts/LoginTemplate";
import { Box, Link, Heading, Text } from "@chakra-ui/react";
import GOCButton from "@/components/GOCButton";
import LaserCat from "@/components/LasterCat";
import { FaCat } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export const NotFoundPage = () => (
  <LoginTemplate activeKey={NavbarActiveKey.NONE}>
    <NotFoundBody />
  </LoginTemplate>
);

const NotFoundBody: React.FC = () => {
  const { pathname } = useLocation();
  const isCatPage = pathname === "/cat";

  return isCatPage ? (
    <Box as="section" position="relative">
      <Heading
        as={"h2"}
        fontSize={"2xl"}
        textAlign={"center"}
        marginBottom={".3rem"}
      >
        404 - Cat Zone
      </Heading>
      <Text fontSize={"sm"} marginBottom={"1rem"}>
        Don't let the cat touch the laser!
      </Text>
      <LaserCat />
    </Box>
  ) : (
    <Box as="section" position="relative">
      <Heading as="h2" margin=".3rem">
        404
      </Heading>
      <Text textWrap="nowrap">Page Not Found</Text>
      <GOCButton href="/">Go Home</GOCButton>
      <Box position="absolute" top="-10%" right="-40%">
        <Link href="/cat">
          <FaCat style={{ color: "rgb(229, 230, 232)" }} />
        </Link>
      </Box>
    </Box>
  );
};
