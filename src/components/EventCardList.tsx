/**
 * EventCardList - Renders a list of EventCard components
 */

import { EventCard } from "@/components/EventCard";
import { Event } from "@/pages/Events";
import { Grid, Heading, Stack, Text } from "@chakra-ui/react";
import GOCSpinner from "./GOCSpinner";

interface EventListProps {
  events: Event[];
  loading: boolean;
  inATeam: boolean;
  onEventUpdate: () => void;
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

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap="6"
      width="100%"
    >
       {events.map((event) => (
         <EventCard 
           key={event.id} 
           event={event} 
           inATeam={inATeam}
           onEventUpdate={onEventUpdate}
         />
       ))}
    </Grid>
  );
};
