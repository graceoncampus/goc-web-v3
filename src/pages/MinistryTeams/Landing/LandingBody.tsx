import { Box, Container, Text, VStack } from "@chakra-ui/react";
import Navbar, { NavbarActiveKey } from "components/Navbar";

export const LandingBody = () => {
  return (
    <Box className="page-container">
      <Navbar selectedNavItemName={NavbarActiveKey.NONE} />

      <Container maxWidth="container.md" centerContent>
        <VStack gap={4} textAlign="center" marginTop={8}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            Thank you for serving!
          </Text>

          <Text fontSize="lg" color="gray.600">
            Please use the links in the navigation bar to access the ministry
            team pages.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
