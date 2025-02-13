import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Field } from "components/ui/field";
import { Radio, RadioGroup } from "components/ui/radio";

interface DriverSignupFormProps {
  setDriverSignupCompleted: (driverSignupValue: boolean) => void;
}

type EventTimeOption = {
  heading: string;
  subtext: string;
};

export const DriverSignupForm = ({ setDriverSignupCompleted }: DriverSignupFormProps) => {
  const [eventTimes] = useState<EventTimeOption[]>([
    { heading: "Morning", subtext: "(9am - 12:30pm)" },
    { heading: "Evening", subtext: "(6pm - 7:30pm)" },
    { heading: "Staying", subtext: "(9am - 7:30pm)" },
  ]);

  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverPhoneNumber, setDriverPhoneNumber] = useState("");
  const [driverEventTime, setDriverEventTime] = useState("");
  const [driverAddress, setDriverAddress] = useState("");
  const [driverNumRiderSpots, setDriverNumRiderSpots] = useState<number | "">("");
  const [driverComments, setDriverComments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDriverSignupCompleted(true);
  };

  return (
    <Container maxW="container.md" p={6}>
      <Box textAlign="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="teal.500">
          Sign up to drive to Church!
        </Text>
      </Box>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack gap={4} align="stretch">
          <Stack direction={{ base: "column", md: "row" }} gap={6}>
            {/* Left Column */}
            <VStack gap={4} flex={1}>
              <Field label="Name" required>
                <Input
                  placeholder="Enter your name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
              </Field>

              <Field label="Email" required>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={driverEmail}
                  onChange={(e) => setDriverEmail(e.target.value)}
                />
              </Field>

              <Field label="Phone Number" required>
                <Input
                  placeholder="Enter your phone number"
                  value={driverPhoneNumber}
                  onChange={(e) => setDriverPhoneNumber(e.target.value)}
                />
              </Field>

              <Field label="Event Time" required>
                <RadioGroup value={driverEventTime} onValueChange={(e) => setDriverEventTime(e.value)}>
                  <Stack direction="column">
                    {eventTimes.map((eventTime) => (
                      <Radio key={eventTime.heading} value={eventTime.heading}>
                        <Box>
                          <Text fontWeight="bold">{eventTime.heading}</Text>
                          <Text fontSize="sm" color="gray.500">
                            {eventTime.subtext}
                          </Text>
                        </Box>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Field>
            </VStack>

            {/* Right Column */}
            <VStack gap={4} flex={1}>
              <Field label="Address" required>
                <Input
                  placeholder="Enter your address"
                  value={driverAddress}
                  onChange={(e) => setDriverAddress(e.target.value)}
                />
              </Field>

              <Field label="Number of Rider Spots" required>
                <Input
                  placeholder="Enter number of spots in your car"
                  type="number"
                  value={driverNumRiderSpots}
                  onChange={(e) => setDriverNumRiderSpots(Number(e.target.value) || "")}
                />
              </Field>

              <Field label="Comments">
                <Textarea
                  placeholder="Additional comments (optional)"
                  rows={4}
                  value={driverComments}
                  onChange={(e) => setDriverComments(e.target.value)}
                />
              </Field>
            </VStack>
          </Stack>

          <Button colorScheme="teal" size="lg" type="submit" width="full">
            <strong>SIGN UP</strong>
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};
