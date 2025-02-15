import { Box, Container, Text, VStack } from "@chakra-ui/react";

export const DriverSignupThankYou = () => {
  return (
    <Container maxWidth="container.md" centerContent>
      <Box textAlign="center" marginTop={"2.5rem"}>
        <VStack gap={"1rem"}>
          <Text fontSize="2xl" fontWeight="bold" color="black">
            Thank you for signing up to drive!
          </Text>
          <Text fontSize="lg" color="gray.600">
            You will receive a confirmation email shortly.
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};
