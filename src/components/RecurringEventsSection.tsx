import { EventCard } from "@/components/EventCard";
import GOCSpinner from "@/components/GOCSpinner";
import { checkInATeam, checkIsLoggedIn } from "@/auth/CheckUser";
import { createRecurringEvent } from "@/graphql/mutations";
import { listRecurringEvents } from "@/graphql/queries";
import { listPublicRecurringEvents } from "@/utils/eventQueries";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { generateClient } from "aws-amplify/api";
import { useCallback, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

export interface RecurringEvent {
  id: string;
  name: string;
  signupLink?: string;
  signupDeadline?: string;
  description: string;
  time: string;
  location: string;
  imageLink: string;
  galleryLink?: string;
  addToGoogleCalendar: boolean;
}

interface EventAccess {
  authChecked: boolean;
  inATeam: boolean;
  isLoggedIn: boolean;
}

interface RecurringEventsSectionProps {
  access?: EventAccess;
  showAdminForm?: boolean;
  title?: string;
}

const client = generateClient();

const emptyRecurringEventForm = {
  name: "",
  description: "",
  location: "",
  imageLink: "",
  time: "",
  signupLink: "",
  signupDeadline: "",
  galleryLink: "",
  addToGoogleCalendar: false,
};

export const RecurringEventsSection = ({
  access,
  showAdminForm = true,
  title = "Recurring Events",
}: RecurringEventsSectionProps) => {
  const [events, setEvents] = useState<RecurringEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(false);
  const [localInATeam, setLocalInATeam] = useState(false);
  const [localAuthChecked, setLocalAuthChecked] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEventForm, setNewEventForm] = useState(emptyRecurringEventForm);

  const isLoggedIn = access?.isLoggedIn ?? localIsLoggedIn;
  const inATeam = access?.inATeam ?? localInATeam;
  const authChecked = access?.authChecked ?? localAuthChecked;

  const fetchEvents = useCallback(async () => {
    try {
      const result: any = await client.graphql({
        query: isLoggedIn ? listRecurringEvents : listPublicRecurringEvents,
      });

      const eventsData = result.data?.listRecurringEvents?.items || [];

      const mappedEvents: RecurringEvent[] = eventsData.map((event: any) => ({
        id: event.id,
        name: event.name,
        signupLink: event.signupLink,
        signupDeadline: event.signupDeadline,
        description: event.description,
        time: event.time,
        location: event.location,
        imageLink: event.imageLink,
        galleryLink: event.galleryLink,
        addToGoogleCalendar: event.addToGoogleCalendar,
      }));

      setEvents(mappedEvents);
    } catch (reason) {
      console.error(reason);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (access) return;

    const checkAuth = async () => {
      try {
        const loggedIn = await checkIsLoggedIn(setLocalIsLoggedIn);
        if (loggedIn) {
          await checkInATeam(setLocalInATeam);
        } else {
          setLocalInATeam(false);
        }
      } finally {
        setLocalAuthChecked(true);
      }
    };

    checkAuth();
  }, [access]);

  useEffect(() => {
    if (authChecked) fetchEvents();
  }, [authChecked, fetchEvents]);

  const handleCreateEvent = async () => {
    setIsSubmitting(true);
    try {
      const eventId = `recurring-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

      await client.graphql({
        query: createRecurringEvent,
        variables: {
          input: {
            id: eventId,
            name: newEventForm.name,
            description: newEventForm.description,
            location: newEventForm.location,
            imageLink: newEventForm.imageLink,
            time: newEventForm.time,
            signupLink: newEventForm.signupLink || undefined,
            signupDeadline: newEventForm.signupDeadline || undefined,
            galleryLink: newEventForm.galleryLink || undefined,
            addToGoogleCalendar: newEventForm.addToGoogleCalendar,
          },
        },
      });
      console.log("Recurring event created successfully");

      setNewEventForm(emptyRecurringEventForm);
      setIsFormOpen(false);

      await fetchEvents();
    } catch (error) {
      console.error("Error creating recurring event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Stack
        as={"section"}
        width={"100%"}
        maxWidth={{ base: "100%", md: "1200px" }}
        align={"stretch"}
        gap={"1.5rem"}
      >
        <Heading
          as="h2"
          color="goc.dark_blue"
          fontFamily="Poppins"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          marginBottom={0}
          textAlign={{ base: "center", md: "left" }}
        >
          {title}
        </Heading>

        {loading ? (
          <Flex justify="center" py="8">
            <GOCSpinner />
          </Flex>
        ) : events.length === 0 ? (
          <Box
            textAlign="center"
            py="12"
            px="6"
            backgroundColor="white"
            borderRadius="lg"
            width="100%"
            border="1px solid"
            borderColor="gray.100"
          >
            <Heading size="md" color="gray.600" mb="2">
              No Recurring Events
            </Heading>
            <Text color="gray.500">
              {inATeam
                ? "Create your first recurring event using the form below."
                : "Check back soon for recurring events!"}
            </Text>
          </Box>
        ) : (
          <Stack gap="1.5rem" width="100%">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={{ kind: "recurring", ...event, title: event.name }}
                inATeam={inATeam}
                galleryAccessContext={{ isLoggedIn }}
                onEventUpdate={fetchEvents}
              />
            ))}
          </Stack>
        )}
      </Stack>

      {showAdminForm && inATeam && (
        <Stack
          as={"section"}
          width={"100%"}
          maxWidth={{ base: "100%", md: "1200px" }}
          align={"center"}
          gap={"1rem"}
        >
          <Box
            width={"100%"}
            backgroundColor="white"
            borderRadius="lg"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            p={6}
            border="1px solid"
            borderColor="gray.200"
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color="goc.dark_blue">
                Create New Recurring Event
              </Heading>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFormOpen(!isFormOpen)}
              >
                {isFormOpen ? "Hide" : "Show"} Form
              </Button>
            </Flex>

            {isFormOpen && (
              <Stack gap="4">
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Name *
                  </Text>
                  <Input
                    value={newEventForm.name}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        name: e.target.value,
                      })
                    }
                    placeholder="Event name"
                    required
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Description *
                  </Text>
                  <Textarea
                    value={newEventForm.description}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Event description"
                    rows={3}
                    required
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Time *
                  </Text>
                  <Input
                    value={newEventForm.time}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        time: e.target.value,
                      })
                    }
                    placeholder="e.g., Every Sunday at 10:00 AM"
                    required
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Location *
                  </Text>
                  <Input
                    value={newEventForm.location}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        location: e.target.value,
                      })
                    }
                    placeholder="Event location"
                    required
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Image URL *
                  </Text>
                  <Input
                    value={newEventForm.imageLink}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        imageLink: e.target.value,
                      })
                    }
                    placeholder="Image URL"
                    required
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Signup URL
                  </Text>
                  <Input
                    value={newEventForm.signupLink}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        signupLink: e.target.value,
                      })
                    }
                    placeholder="Signup URL"
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Signup Deadline
                  </Text>
                  <Input
                    value={newEventForm.signupDeadline}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        signupDeadline: e.target.value,
                      })
                    }
                    placeholder="Signup deadline"
                  />
                </Box>
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Gallery URL
                  </Text>
                  <Input
                    value={newEventForm.galleryLink}
                    onChange={(e) =>
                      setNewEventForm({
                        ...newEventForm,
                        galleryLink: e.target.value,
                      })
                    }
                    placeholder="Gallery URL"
                  />
                </Box>
                <Box>
                  <Checkbox.Root
                    checked={newEventForm.addToGoogleCalendar}
                    onCheckedChange={(details) =>
                      setNewEventForm({
                        ...newEventForm,
                        addToGoogleCalendar: details.checked === true,
                      })
                    }
                    colorPalette="blue"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control
                      borderColor="goc.blue"
                      _checked={{
                        backgroundColor: "goc.blue",
                        borderColor: "goc.blue",
                      }}
                      _hover={{
                        borderColor: "goc.dark_blue",
                      }}
                    />
                    <Checkbox.Label>Add To Google Calendar</Checkbox.Label>
                  </Checkbox.Root>
                </Box>
                <Flex gap="3" mt="2" justify="flex-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsFormOpen(false);
                      setNewEventForm(emptyRecurringEventForm);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    backgroundColor="goc.blue"
                    color="white"
                    onClick={handleCreateEvent}
                    disabled={
                      isSubmitting ||
                      !newEventForm.name ||
                      !newEventForm.description ||
                      !newEventForm.location ||
                      !newEventForm.imageLink ||
                      !newEventForm.time
                    }
                  >
                    <Icon as={MdAdd} boxSize="4" mr="2" />
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>
                </Flex>
              </Stack>
            )}
          </Box>
        </Stack>
      )}
    </>
  );
};
