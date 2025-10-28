/**
 * EventCard - Displays event information in a card format
 */

import { Event } from "@/pages/Events";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Image,
  Button,
  Flex,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { MdLocationPin, MdCalendarToday, MdAccessTime, MdArrowForward } from "react-icons/md";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleEventClick = () => {
    // For now, we'll navigate to events page, but this could be enhanced
    // to navigate to a specific event detail page
    navigate("/events");
  };

  return (
    <Box
      width={{ base: "100%", md: "calc(50% - 12px)", lg: "calc(33.333% - 16px)" }}
      minWidth="300px"
      borderRadius="xl"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transform: "translateY(-4px)",
      }}
      cursor="pointer"
      onClick={handleEventClick}
      backgroundColor="white"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      position="relative"
    >
      {/* Image Section */}
      {event.imageLink && (
        <Box position="relative" height="200px" overflow="hidden">
          <Image
            src={event.imageLink}
            alt={event.title}
            objectFit="cover"
            width="100%"
            height="100%"
            transition="transform 0.3s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
          {/* Gradient overlay for better text readability */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)"
          />
          
        </Box>
      )}

      {/* Content Section */}
      <Box p={{ base: "4", md: "6" }}>
        {/* Title */}
        <Heading 
          size={{ base: "md", md: "lg" }}
          color="goc.dark_blue" 
          fontFamily="Poppins"
          fontWeight="600"
          mb="3"
          lineHeight="1.3"
        >
          {event.title}
        </Heading>

        {/* Date and Time */}
        <VStack align="start" gap="2" mb="4">
          <HStack gap="2" color="gray.600">
            <Icon as={MdCalendarToday} color="goc.blue" boxSize="4" />
            <Text fontSize="sm" fontWeight="500">
              {formatDate(event.startDate)}
            </Text>
          </HStack>
          
          {event.startDate && (
            <HStack gap="2" color="gray.600">
              <Icon as={MdAccessTime} color="goc.blue" boxSize="4" />
              <Text fontSize="sm" fontWeight="500">
                {formatTime(event.startDate)}
              </Text>
            </HStack>
          )}
        </VStack>

        {/* Description */}
        {event.description && (
          <Text 
            fontSize="sm" 
            color="gray.700" 
            lineHeight="1.5"
            mb="4"
          >
            {event.description.length > 120 
              ? `${event.description.substring(0, 120)}...` 
              : event.description}
          </Text>
        )}

        {/* Location */}
        {event.location && (
          <HStack gap="2" mb="4" color="gray.600">
            <Icon as={MdLocationPin} color="goc.blue" boxSize="4" />
            <Text fontSize="sm" fontWeight="500">
              {event.location.length > 30 
                ? `${event.location.substring(0, 30)}...` 
                : event.location}
            </Text>
          </HStack>
        )}

        {/* Divider */}
        <Box height="1px" backgroundColor="gray.200" mb="4" />

        {/* Action Button */}
        <Button
          size="md"
          width="100%"
          backgroundColor="goc.blue"
          color="white"
          borderRadius="lg"
          fontWeight="600"
          fontSize="sm"
          py="6"
          transition="all 0.2s ease"
          _hover={{
            backgroundColor: "goc.dark_blue",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(51, 102, 204, 0.3)",
          }}
          _active={{
            transform: "translateY(0)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleEventClick();
          }}
        >
          Learn More
          <Icon as={MdArrowForward} boxSize="4" ml="2" />
        </Button>
      </Box>
    </Box>
  );
};
