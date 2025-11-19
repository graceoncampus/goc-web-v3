import { NavbarActiveKey } from "@/components/Navbar";
import { listGOCEvents } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Container,
  AspectRatio,
  Input,
  Textarea,
  Button,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import GOCSpinner from "@/components/GOCSpinner";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { MdAttachMoney, MdLocationPin, MdAdd } from "react-icons/md";
import { EventList } from "@/components/EventCardList";
import { checkInATeam, checkIsLoggedIn } from "@/auth/CheckUser";
import { fetchAuthSession } from "aws-amplify/auth";
import { createGOCEvents } from "@/graphql/mutations";
import {
  createGoogleCalendarEvent,
  generateGoogleCalendarUrl,
  getGoogleCalendarAccessToken,
  loadGoogleAPI,
} from "@/utils/googleCalendar";

const client = generateClient();

export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  price: Number;
  location: string;
  description: string;
  imageLink: string;
  active?: boolean;
  galleryLink?: string;
}

export const EventsPage: React.FC = () => {
  return (
    <BannerTemplate
      title="Events"
      activeKey={NavbarActiveKey.EVENTS}
      imageSrc="/images/events.jpg"
      alt="Events page banner"
    >
      <EventsBody />
    </BannerTemplate>
  );
};

const EventsBody: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inATeam, setInATeam] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const result = await client.graphql({ query: listGOCEvents });
        const eventsData =
          result.data?.listGOCEvents?.items?.sort(
            (a: any, b: any) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
          ) || [];

        let authorized = false;
        try {
          const session = await fetchAuthSession();
          const groups = session.tokens?.idToken?.payload["cognito:groups"];
          authorized = Array.isArray(groups) && groups.includes("ATeam");
        } catch (error) {
          authorized = false;
        }

        const mappedEvents = eventsData
          .map((event: any) => ({
            id: event.id,
            title: event.title,
            startDate: event.startDate,
            endDate: event.endDate,
            price: event.price,
            location: event.location,
            description: event.description,
            imageLink: event.imageLink,
            active: event.active,
            galleryLink: event.galleryLink,
          }))
          .filter((e) => e.active || authorized);
        setEvents(mappedEvents);
      } catch (reason) {
        console.error(reason);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [inATeam, setInATeam]);

  useEffect(() => {
    const checkAuth = async () => {
      await checkIsLoggedIn(setIsLoggedIn);
      await checkInATeam(setInATeam);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    // Load Google API when component mounts
    const initGoogleAPI = async () => {
      try {
        await loadGoogleAPI();
        setIsGoogleAPILoaded(true);
      } catch (error) {
        console.error("Failed to load Google API:", error);
        setCalendarStatus("Failed to load Google Calendar API");
      }
    };
    initGoogleAPI();
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newEventForm, setNewEventForm] = useState({
    title: "",
    description: "",
    location: "",
    imageLink: "",
    startDate: "",
    endDate: "",
    addToCalendar: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarStatus, setCalendarStatus] = useState<string>("");
  const [isGoogleAPILoaded, setIsGoogleAPILoaded] = useState(false);

  const handleCreateEvent = async () => {
    setIsSubmitting(true);
    try {
      // Generate a unique ID for the event
      const eventId = `event-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

      // Convert datetime-local values to ISO format
      const startDateISO = newEventForm.startDate
        ? new Date(newEventForm.startDate).toISOString()
        : "";
      const endDateISO = newEventForm.endDate
        ? new Date(newEventForm.endDate).toISOString()
        : undefined;

      await client.graphql({
        query: createGOCEvents,
        variables: {
          input: {
            id: eventId,
            title: newEventForm.title,
            description: newEventForm.description,
            location: newEventForm.location,
            imageLink: newEventForm.imageLink,
            startDate: startDateISO,
            endDate: endDateISO,
            price: 0,
          },
        },
      });
      console.log("Event created successfully");

      if (newEventForm.addToCalendar) {
        setCalendarStatus("Adding to Google Calendar...");
        try {
          if (!isGoogleAPILoaded) {
            throw new Error("Google API not loaded");
          }

          // Create the event object for Google Calendar
          const eventForCalendar: Event = {
            id: eventId,
            title: newEventForm.title,
            description: newEventForm.description,
            location: newEventForm.location,
            startDate: startDateISO,
            endDate: endDateISO || startDateISO,
            price: 0,
            imageLink: newEventForm.imageLink,
          };

          try {
            // Try to use the API method first
            const accessToken = await getGoogleCalendarAccessToken();
            const calendarEventId = await createGoogleCalendarEvent(
              eventForCalendar,
              accessToken,
            );
            setCalendarStatus(
              `✅ Event added to Google Calendar (ID: ${calendarEventId})`,
            );
          } catch (apiError) {
            console.warn(
              "API method failed, falling back to URL method:",
              apiError,
            );
            // Fallback to URL method
            const calendarUrl = generateGoogleCalendarUrl(eventForCalendar);
            window.open(calendarUrl, "_blank");
            setCalendarStatus("✅ Google Calendar opened in new tab");
          }
        } catch (error) {
          console.error("Failed to add to Google Calendar:", error);
          setCalendarStatus(
            `❌ Failed to add to Google Calendar: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }

      // Reset form
      setNewEventForm({
        title: "",
        description: "",
        location: "",
        imageLink: "",
        startDate: "",
        endDate: "",
        addToCalendar: false,
      });
      setIsFormOpen(false);

      // Clear calendar status after a delay
      setTimeout(() => {
        setCalendarStatus("");
      }, 5000);

      // Refresh events
      const fetchEvents = async () => {
        try {
          const result = await client.graphql({ query: listGOCEvents });
          const eventsData =
            result.data?.listGOCEvents?.items?.sort(
              (a: any, b: any) =>
                new Date(b.startDate).getTime() -
                new Date(a.startDate).getTime(),
            ) || [];
          let authorized = false;
          try {
            const session = await fetchAuthSession();
            const groups = session.tokens?.idToken?.payload["cognito:groups"];
            authorized = Array.isArray(groups) && groups.includes("ATeam");
          } catch (error) {
            authorized = false;
          }
          const mappedEvents = eventsData
            .map((event: any) => ({
              id: event.id,
              title: event.title,
              startDate: event.startDate,
              endDate: event.endDate,
              price: event.price,
              location: event.location,
              description: event.description,
              imageLink: event.imageLink,
              active: event.active,
              galleryLink: event.galleryLink,
            }))
            .filter((e) => e.active || authorized);
          setEvents(mappedEvents);
        } catch (reason) {
          console.error(reason);
        }
      };
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
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
        {/* <EventList events={events} loading={loading} /> */}
        <Stack id={"calendar"} as={"section"} width={"100%"} align={"center"}>
          <Heading
            as="h2"
            textAlign={"center"}
            marginBottom={{ base: "1rem", md: "2rem" }}
            fontSize={{
              base: "2xl",
              md: "3xl",
              lg: "4xl",
              xl: "4xl",
            }}
          >
            Calendar
          </Heading>
          <AspectRatio
            ratio={{ base: 1, md: 4 / 3 }}
            width={{ base: "100%", lg: "800px" }}
          >
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&title&showCalendars=0&mode=MONTH&showTz=0&src=Z29jYXRlYW1AZ21haWwuY29t&color=%23C0CA33"
              title="Google Calendar"
            />
          </AspectRatio>
        </Stack>

        {/* Create Event Form - Only visible to ATeam */}
        {inATeam && (
          <Stack
            as={"section"}
            width={"100%"}
            maxWidth={{ base: "100%", md: "800px" }}
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
                  Create New Event
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
                      Title *
                    </Text>
                    <Input
                      value={newEventForm.title}
                      onChange={(e) =>
                        setNewEventForm({
                          ...newEventForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="Event title"
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
                  <Flex gap="4" wrap="wrap">
                    <Box flex="1" minWidth="250px">
                      <Text fontSize="sm" fontWeight="500" mb="2">
                        Start Date *
                      </Text>
                      <Input
                        type="datetime-local"
                        value={newEventForm.startDate}
                        onChange={(e) =>
                          setNewEventForm({
                            ...newEventForm,
                            startDate: e.target.value,
                          })
                        }
                        required
                      />
                    </Box>
                    <Box flex="1" minWidth="250px">
                      <Text fontSize="sm" fontWeight="500" mb="2">
                        End Date
                      </Text>
                      <Input
                        type="datetime-local"
                        value={newEventForm.endDate}
                        onChange={(e) =>
                          setNewEventForm({
                            ...newEventForm,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Flex>
                  <Box>
                    <Checkbox.Root
                      checked={newEventForm.addToCalendar}
                      onCheckedChange={(details) =>
                        setNewEventForm({
                          ...newEventForm,
                          addToCalendar: details.checked === true,
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
                    {calendarStatus && (
                      <Text
                        fontSize="sm"
                        mt="2"
                        color={
                          calendarStatus.includes("❌")
                            ? "red.500"
                            : "green.500"
                        }
                      >
                        {calendarStatus}
                      </Text>
                    )}
                  </Box>
                  <Flex gap="3" mt="2" justify="flex-end">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsFormOpen(false);
                        setCalendarStatus("");
                        setNewEventForm({
                          title: "",
                          description: "",
                          location: "",
                          imageLink: "",
                          startDate: "",
                          endDate: "",
                          addToCalendar: false,
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
                        !newEventForm.title ||
                        !newEventForm.description ||
                        !newEventForm.location ||
                        !newEventForm.imageLink ||
                        !newEventForm.startDate
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
      </Stack>
      <EventList
        events={events}
        loading={loading}
        inATeam={inATeam}
        onEventUpdate={() => {
          // Refresh events after update
          const fetchEvents = async () => {
            try {
              const result = await client.graphql({ query: listGOCEvents });
              const eventsData =
                result.data?.listGOCEvents?.items?.sort(
                  (a: any, b: any) =>
                    new Date(b.startDate).getTime() -
                    new Date(a.startDate).getTime(),
                ) || [];
              let authorized = false;
              try {
                const session = await fetchAuthSession();
                const groups =
                  session.tokens?.idToken?.payload["cognito:groups"];
                authorized = Array.isArray(groups) && groups.includes("ATeam");
              } catch (error) {
                authorized = false;
              }
              const mappedEvents = eventsData
                .map((event: any) => ({
                  id: event.id,
                  title: event.title,
                  startDate: event.startDate,
                  endDate: event.endDate,
                  price: event.price,
                  location: event.location,
                  description: event.description,
                  imageLink: event.imageLink,
                  active: event.active,
                  galleryLink: event.galleryLink,
                }))
                .filter((e) => e.active || authorized);
              setEvents(mappedEvents);
            } catch (reason) {
              console.error(reason);
            }
          };
          fetchEvents();
        }}
      />
    </Container>
  );
};
