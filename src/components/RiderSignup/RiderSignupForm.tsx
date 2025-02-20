import { useForm, Controller } from "react-hook-form";
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
  Heading,
  Image,
} from "@chakra-ui/react";
import { Field } from "components/ui/field";

interface RiderSignupFormProps {
  setRiderSignupCompleted: (riderSignupValue: boolean) => void;
}

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  pickupLocation: string;
  offCampusLocation?: string;
  eventTime: string;
  comments?: string;
};

type EventTimeOption = {
  heading: string;
  subtext: string;
};

export const RiderSignupForm = ({
  setRiderSignupCompleted,
}: RiderSignupFormProps) => {
  const eventPickupLocations = [
    "Hedrick Turnaround",
    "Holly Turnaround",
    "De Neve Turnaround",
  ];
  const eventTimes: EventTimeOption[] = [
    { heading: "Morning", subtext: "(9am - 12:30pm)" },
    { heading: "Evening", subtext: "(6pm - 7:30pm)" },
    { heading: "Staying", subtext: "(9am - 7:30pm)" },
  ];

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      pickupLocation: "",
      offCampusLocation: "",
      eventTime: "",
      comments: "",
    },
  });

  const pickupLocation = watch("pickupLocation");

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
    setRiderSignupCompleted(true);
  };

  return (
    <Container
      fluid
      padding={"2rem"}
      boxShadow={"md"}
      border={"3px solid {colors.goc.blue}"}
    >
      <Heading
        id="rider-signup"
        as="h2"
        textAlign="center"
        fontWeight="bold"
        color="black"
        marginBottom="1rem"
      >
        Sign up for a ride to Church!
      </Heading>
      <Container maxWidth="70%">
        <Image
          src="/images/pickup_locations.png"
          alt="Pickup Locations"
          borderRadius="md"
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center"
          userSelect="none"
          marginY="2.5rem"
        />
      </Container>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack gap="2.5rem" align="stretch">
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "3rem", md: "2rem", xl: "4rem" }}
            width={"100%"}
          >
            {/* Left Column */}
            <VStack gap="2rem" flex={7} alignItems="left" width={"100%"}>
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

              <Field
                label="Pickup Location"
                required
                gap={"1rem"}
                width={"100%"}
              >
                <Controller
                  name="pickupLocation"
                  control={control}
                  rules={{ required: "Pickup location is required" }}
                  render={({ field }) => (
                    <VStack align="start" width={"100%"}>
                      {eventPickupLocations.map((location) => (
                        <label
                          key={location}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="radio"
                            {...field}
                            checked={field.value === location}
                            value={location}
                            style={{ marginRight: "8px" }}
                          />
                          <Text fontSize="sm">{location}</Text>
                        </label>
                      ))}

                      <HStack width={"100%"}>
                        <label
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <input
                            type="radio"
                            {...field}
                            checked={field.value === "Off Campus"}
                            value="Off Campus"
                            style={{ marginRight: "8px" }}
                          />
                          <Text fontSize="sm">Other&nbsp;</Text>
                        </label>
                        <Input
                          type="text"
                          backgroundColor="white"
                          {...register("offCampusLocation", {
                            required:
                              pickupLocation === "Off Campus"
                                ? "Off-campus location is required"
                                : false,
                          })}
                          disabled={pickupLocation !== "Off Campus"}
                        />
                      </HStack>
                    </VStack>
                  )}
                />
                {errors.pickupLocation && (
                  <Text margin="0" color="red" fontSize="sm">
                    {errors.pickupLocation.message}
                  </Text>
                )}
              </Field>
            </VStack>

            {/* Right Column */}
            <VStack gap="2rem" flex={7}>
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
