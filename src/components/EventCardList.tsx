import { EventCard } from "@/components/EventCard";
import { Event } from "@/pages/Events";
import { Heading, Stack, Text } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import GOCSpinner from "./GOCSpinner";

interface EventListProps {
  events: Event[];
  loading: boolean;
  inATeam: boolean;
  onEventUpdate: () => void;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function categorize(events: Event[]) {
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekEnd = new Date(todayStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const current: Event[] = [];
  const upcoming: Event[] = [];
  const pastByYear: Record<number, Event[]> = {};

  for (const event of events) {
    const start = new Date(event.startDate);

    if (start >= todayStart && start < weekEnd) {
      current.push(event);
    } else if (start >= weekEnd) {
      upcoming.push(event);
    } else {
      const year = start.getFullYear();
      if (!pastByYear[year]) pastByYear[year] = [];
      pastByYear[year].push(event);
    }
  }

  // Sort current/upcoming ascending, past descending within each year
  current.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  upcoming.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  for (const year of Object.keys(pastByYear)) {
    pastByYear[Number(year)].sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );
  }

  const pastYears = Object.keys(pastByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return { current, upcoming, pastByYear, pastYears };
}

function EventSection({
  title,
  events,
  inATeam,
  onEventUpdate,
}: {
  title: string;
  events: Event[];
  inATeam: boolean;
  onEventUpdate: () => void;
}) {
  if (events.length === 0) return null;
  return (
    <Stack width="100%" gap="3">
      <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} color="goc.dark_blue" fontFamily="Poppins">
        {title}
      </Heading>
      <Stack gap="1.5rem" width="100%">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={{ kind: "event", ...event, price: Number(event.price) }}
            inATeam={inATeam}
            onEventUpdate={onEventUpdate}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export const EventList = ({ events, loading, inATeam, onEventUpdate }: EventListProps) => {
  if (loading) return <GOCSpinner />;

  if (events.length === 0) {
    return (
      <Stack marginY="1rem" align="center">
        <Text fontSize={{ base: "md", md: "xl" }} color="goc.blue">
          There are no upcoming events!
        </Text>
      </Stack>
    );
  }

  const { current, upcoming, pastByYear, pastYears } = categorize(events);

  return (
    <Stack gap="3rem" width="100%">
      <EventSection title="This Week" events={current} inATeam={inATeam} onEventUpdate={onEventUpdate} />
      <EventSection title="Upcoming" events={upcoming} inATeam={inATeam} onEventUpdate={onEventUpdate} />

      {pastYears.length > 0 && (
        <Stack width="100%" gap="3">
          <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} color="goc.dark_blue" fontFamily="Poppins">
            Past Events
          </Heading>
          <AccordionRoot multiple defaultValue={[String(pastYears[0])]}>
            {pastYears.map((year) => (
              <AccordionItem key={year} value={String(year)}>
                <AccordionItemTrigger>
                  <Text fontWeight="600" fontSize="md">{year}</Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <Stack gap="1.5rem" pt="2" pb="4">
                    {pastByYear[year].map((event) => (
                      <EventCard
                        key={event.id}
                        event={{ kind: "event", ...event, price: Number(event.price) }}
                        inATeam={inATeam}
                        onEventUpdate={onEventUpdate}
                      />
                    ))}
                  </Stack>
                </AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </Stack>
      )}

      {current.length === 0 && upcoming.length === 0 && pastYears.length === 0 && (
        <Stack marginY="1rem" align="center">
          <Text fontSize={{ base: "md", md: "xl" }} color="goc.blue">
            There are no upcoming events!
          </Text>
        </Stack>
      )}
    </Stack>
  );
};
