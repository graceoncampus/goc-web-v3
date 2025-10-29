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
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import GOCSpinner from "@/components/GOCSpinner";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { MdAttachMoney, MdLocationPin } from "react-icons/md";
import { EventList } from "@/components/EventCardList";
import { checkInATeam, checkIsLoggedIn } from "@/auth/CheckUser";
import { fetchAuthSession } from "aws-amplify/auth";

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
              const mappedEvents = eventsData.map((event: any) => ({
                id: event.id,
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                price: event.price,
                location: event.location,
                description: event.description,
                imageLink: event.imageLink,
              }));
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
