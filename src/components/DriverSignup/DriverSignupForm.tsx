import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Field } from "components/ui/field";

interface DriverSignupFormProps {
  setDriverSignupCompleted: (driverSignupValue: boolean) => void;
}

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  eventTime: string;
  address: string;
  numRiderSpots: number | "";
  comments?: string;
};

type EventTimeOption = {
  heading: string;
  subtext: string;
};

export const DriverSignupForm = ({
  setDriverSignupCompleted,
}: DriverSignupFormProps) => {
  const eventTimes: EventTimeOption[] = [
    { heading: "Morning", subtext: "(9am - 12:30pm)" },
    { heading: "Evening", subtext: "(6pm - 7:30pm)" },
    { heading: "Staying", subtext: "(9am - 7:30pm)" },
  ];

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      eventTime: "",
      address: "",
      numRiderSpots: "",
      comments: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Driver Form Submitted:", data);
    setDriverSignupCompleted(true);
  };

  return (
    <Container
      fluid
      padding={"2rem"}
      boxShadow={"md"}
      border={"3px solid {colors.goc.blue}"}
    >
      <Heading
        as={"h2"}
        textAlign="center"
        fontWeight="bold"
        color="black"
        marginBottom="2rem"
      >
        Sign up to drive to Church!
      </Heading>

      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack gap="2.5rem" align="stretch">
          <Stack direction={{ base: "column", md: "row" }} gap="2rem">
            {/* Left Column */}
            <VStack gap="2rem" flex={1} align="stretch">
              <Field label="Name" required>
                <Input
                  type="text"
                  backgroundColor="white"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.name.message}
                  </Text>
                )}
              </Field>

              <Field label="Email" required>
                <Input
                  type="email"
                  backgroundColor="white"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.email.message}
                  </Text>
                )}
              </Field>

              <Field label="Phone Number" required>
                <Input
                  type="tel"
                  backgroundColor="white"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.phoneNumber.message}
                  </Text>
                )}
              </Field>

              <Field label="Event Time" required>
                <Controller
                  name="eventTime"
                  control={control}
                  rules={{ required: "Please select an event time" }}
                  render={({ field }) => (
                    <VStack align="start" width="100%">
                      {eventTimes.map((eventTime) => (
                        <HStack
                          key={eventTime.heading}
                          alignItems="center"
                          width="100%"
                        >
                          <input
                            type="radio"
                            {...field}
                            checked={field.value === eventTime.heading}
                            value={eventTime.heading}
                            style={{ marginRight: "8px" }}
                          />
                          <Box>
                            <Text fontSize="sm" fontWeight="bold">
                              {eventTime.heading}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {eventTime.subtext}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  )}
                />
                {errors.eventTime && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.eventTime.message}
                  </Text>
                )}
              </Field>
            </VStack>

            {/* Right Column */}
            <VStack gap="2rem" flex={1} align="stretch">
              <Field label="Address" required>
                <Input
                  type="text"
                  backgroundColor="white"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.address.message}
                  </Text>
                )}
              </Field>

              <Field label="Number of Rider Spots" required>
                <Input
                  type="number"
                  backgroundColor="white"
                  {...register("numRiderSpots", {
                    required: "Number of rider spots is required",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "At least 1 spot is required",
                    },
                  })}
                />
                {errors.numRiderSpots && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.numRiderSpots.message}
                  </Text>
                )}
              </Field>

              <Field label="Comments">
                <Textarea
                  rows={11}
                  backgroundColor="white"
                  {...register("comments")}
                />
              </Field>
            </VStack>
          </Stack>
          <Button
            backgroundColor="goc.blue"
            type="submit"
            width="full"
            fontWeight={"bold"}
          >
            SIGN UP
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};
