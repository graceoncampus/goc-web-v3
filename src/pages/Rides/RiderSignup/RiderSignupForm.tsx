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
  HStack,
} from "@chakra-ui/react";
import { PickupLocationPopup } from "./PickupLocationPopup/PickupLocationPopup";
import { Field } from "components/ui/field";
import { Radio, RadioGroup } from "components/ui/radio";

interface RiderSignupFormProps {
  setRiderSignupCompleted: (riderSignupValue: boolean) => void;
}

type EventTimeOption = {
  heading: string;
  subtext: string;
};

export const RiderSignupForm = ({
  setRiderSignupCompleted,
}: RiderSignupFormProps) => {
  const [eventPickupLocations] = useState<string[]>([
    "Hedrick Turnaround",
    "Holly Turnaround",
    "De Neve Turnaround",
  ]);

  const [eventTimes] = useState<EventTimeOption[]>([
    { heading: "Morning", subtext: "(9am - 12:30pm)" },
    { heading: "Evening", subtext: "(6pm - 7:30pm)" },
    { heading: "Staying", subtext: "(9am - 7:30pm)" },
  ]);

  const [riderName, setRiderName] = useState("");
  const [riderEmail, setRiderEmail] = useState("");
  const [riderPhoneNumber, setRiderPhoneNumber] = useState("");
  const [riderEventPickupLocation, setRiderEventPickupLocation] = useState("");
  const [riderEventTime, setRiderEventTime] = useState("");
  const [riderComments, setRiderComments] = useState("");
  const [
    disableOffCampusPickupLocationTextInput,
    setDisableOffCampusPickupLocationTextInput,
  ] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRiderSignupCompleted(true);
  };

  return (
    <Container maxW="container.md" p={6}>
      <Box textAlign="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" color="teal.500">
          Sign up for a ride to Church!
        </Text>
      </Box>

      <Box as="form" onSubmit={handleSubmit}>
        <VStack gap={6} align="stretch">
          <Stack direction={{ base: "column", md: "row" }} gap={6}>
            {/* Left Column */}
            <VStack gap={4} flex={1}>
              <Field label="Name" required>
                <Input
                  placeholder="Enter your name"
                  value={riderName}
                  onChange={(e) => setRiderName(e.target.value)}
                />
              </Field>

              <Field label="Email" required>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={riderEmail}
                  onChange={(e) => setRiderEmail(e.target.value)}
                />
              </Field>

              <Field label="Phone Number" required>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={riderPhoneNumber}
                  onChange={(e) => setRiderPhoneNumber(e.target.value)}
                />
              </Field>

              <Field label="Pickup Location" required>
                <PickupLocationPopup />
                <RadioGroup
                  // todo: remove this comment after testing: () => setRiderEventPickupLocation(riderEventPickupLocation)
                  onValueChange={(e) => setRiderEventPickupLocation(e.value)}
                >
                  <Stack direction="column">
                    {eventPickupLocations.map((location) => (
                      <Radio
                        key={location}
                        value={location}
                        onClick={() =>
                          setDisableOffCampusPickupLocationTextInput(true)
                        }
                      >
                        {location}
                      </Radio>
                    ))}
                    <HStack>
                      <Radio
                        value="Off Campus"
                        onClick={() =>
                          setDisableOffCampusPickupLocationTextInput(false)
                        }
                      >
                        Off Campus
                      </Radio>
                      <Input
                        type="text"
                        size="sm"
                        disabled={disableOffCampusPickupLocationTextInput}
                        placeholder="Enter location"
                        onChange={(e) =>
                          setRiderEventPickupLocation(e.target.value)
                        }
                      />
                    </HStack>
                  </Stack>
                </RadioGroup>
              </Field>
            </VStack>

            {/* Right Column */}
            <VStack gap={4} flex={1}>
              <Field label="Event Time" required>
                <RadioGroup
                  // todo: remove this comment after testing: () => setRiderEventTime(riderEventTime)}
                  onValueChange={(e) => setRiderEventTime(e.value)}
                >
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

              <Field label="Comments">
                <Textarea
                  placeholder="Additional comments (optional)"
                  rows={4}
                  value={riderComments}
                  onChange={(e) => setRiderComments(e.target.value)}
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
