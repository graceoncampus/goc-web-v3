import { Container, Text, VStack } from "@chakra-ui/react";

export const RiderSignupThankYou = () => {
  return (
    <Container fluid>
      <VStack gap={"1rem"} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="black">
          Thank you for signing up for a ride!
        </Text>
        <Text fontSize="lg" color="gray.600">
          You will receive a confirmation email shortly
        </Text>
      </VStack>
    </Container>
  );
};
