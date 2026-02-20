import { NavbarActiveKey } from "@/components/Navbar";
import { listRecurringEvents } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Container,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import GOCSpinner from "@/components/GOCSpinner";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { MdAdd } from "react-icons/md";
import { checkInATeam } from "@/auth/CheckUser";
import { createRecurringEvent } from "@/graphql/mutations";
import { RecurringEventCard, RecurringEvent } from "@/components/RecurringEventCard";

const client = generateClient();

export const RecurringEventsPage: React.FC = () => {
  return (
    <BannerTemplate
      title="Recurring Events"
      activeKey={NavbarActiveKey.EVENTS}
      imageSrc="/images/events.jpg"
      alt="Recurring Events page banner"
    >
      <EventsBody />
    </BannerTemplate>
  );
};

const EventsBody: React.FC = () => {
  const [events, setEvents] = useState<RecurringEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inATeam, setInATeam] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newEventForm, setNewEventForm] = useState({
    name: "",
    description: "",
    location: "",
    imageLink: "",
    time: "",
    signupLink: "",
    signupDeadline: "",
    galleryLink: "",
    addToGoogleCalendar: false,
  });

  const fetchEvents = async () => {
    try {
      const result = await client.graphql({ query: listRecurringEvents });

      console.log("res", result)

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
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      await checkInATeam(setInATeam);
    };
    checkAuth();
  }, []);

  const handleCreateEvent = async () => {
    setIsSubmitting(true);
    try {
      // Generate a unique ID for the event
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

      // Reset form
      setNewEventForm({
        name: "",
        description: "",
        location: "",
        imageLink: "",
        time: "",
        signupLink: "",
        signupDeadline: "",
        galleryLink: "",
        addToGoogleCalendar: false,
      });
      setIsFormOpen(false);

      // Refresh events
      fetchEvents();
    } catch (error) {
      console.error("Error creating recurring event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid={true} padding={0}>
      <Stack
        width={{ sm: "100%", md: "4/5" }}
        marginX={"auto"}
        marginY={"1.8rem"}
        align={"center"}
        gap={"3rem"}
      >
        {/* Create Recurring Event Form - Only visible to ATeam */}
        {inATeam && (
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
                      Signup Link (optional)
                    </Text>
                    <Input
                      value={newEventForm.signupLink}
                      onChange={(e) =>
                        setNewEventForm({
                          ...newEventForm,
                          signupLink: e.target.value,
                        })
                      }
                      placeholder="https://..."
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb="2">
                      Signup Deadline (optional)
                    </Text>
                    <Input
                      value={newEventForm.signupDeadline}
                      onChange={(e) =>
                        setNewEventForm({
                          ...newEventForm,
                          signupDeadline: e.target.value,
                        })
                      }
                      placeholder="e.g., Every Friday at 5:00 PM"
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb="2">
                      Gallery Link (optional)
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
                      onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
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
                      <Checkbox.Label>Add to Google Calendar</Checkbox.Label>
                    </Checkbox.Root>
                  </Box>
                  <Flex gap="3" mt="2" justify="flex-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsFormOpen(false);
                        setNewEventForm({
                          name: "",
                          description: "",
                          location: "",
                          imageLink: "",
                          time: "",
                          signupLink: "",
                          signupDeadline: "",
                          galleryLink: "",
                          addToGoogleCalendar: false,
                        });
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

        {/* Recurring Events List */}
        <Stack
          as={"section"}
          width={"100%"}
          maxWidth={{ base: "100%", md: "1200px" }}
          align={"center"}
          gap={"1.5rem"}
        >
          {loading ? (
            <GOCSpinner />
          ) : events.length === 0 ? (
            <Box
              textAlign="center"
              py="12"
              px="6"
              backgroundColor="white"
              borderRadius="lg"
              width="100%"
            >
              <Heading size="md" color="gray.600" mb="2">
                No Recurring Events
              </Heading>
              <Text color="gray.500">
                {inATeam
                  ? "Create your first recurring event using the form above."
                  : "Check back soon for recurring events!"}
              </Text>
            </Box>
          ) : (
            events.map((event) => (
              <RecurringEventCard
                key={event.id}
                event={event}
                inATeam={inATeam}
                onEventUpdate={fetchEvents}
              />
            ))
          )}
        </Stack>
      </Stack>
    </Container>
  );
};
