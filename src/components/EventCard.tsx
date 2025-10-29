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
  Input,
  Textarea,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import {
  MdLocationPin,
  MdCalendarToday,
  MdAccessTime,
  MdArrowForward,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { updateGOCEvents, deleteGOCEvents } from "@/graphql/mutations";

interface EventCardProps {
  event: Event;
  inATeam: boolean;
  onEventUpdate: () => void;
}

export const EventCard = ({
  event,
  inATeam,
  onEventUpdate,
}: EventCardProps) => {
  const navigate = useNavigate();
  const client = generateClient();
  const {
    open: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    open: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [editForm, setEditForm] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    imageLink: event.imageLink,
    startDate: event.startDate,
    endDate: event.endDate,
    active: event.active,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      await client.graphql({
        query: updateGOCEvents,
        variables: {
          input: {
            id: event.id,
            ...editForm,
          },
        },
      });
      console.log("Event updated successfully");
      onEditClose();
      onEventUpdate();
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await client.graphql({
        query: deleteGOCEvents,
        variables: {
          input: {
            id: event.id,
          },
        },
      });
      console.log("Event deleted successfully");
      onDeleteClose();
      onEventUpdate();
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box
        width={{
          base: "100%",
          md: "calc(50% - 12px)",
          lg: "calc(33.333% - 16px)",
        }}
        minWidth="300px"
        borderRadius="xl"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
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
            <Text fontSize="sm" color="gray.700" lineHeight="1.5" mb="4">
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

          {/* Admin Actions */}
          {inATeam && (
            <Flex gap="2" mt="3">
              <Button
                size="sm"
                variant="outline"
                color="goc.blue"
                borderColor="goc.blue"
                flex="1"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditOpen();
                }}
              >
                <Icon as={MdEdit} boxSize="4" mr="1" />
                Edit
              </Button>
            </Flex>
          )}
        </Box>
      </Box>

      {/* Edit Modal */}
      {isEditOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onEditClose();
            }
          }}
        >
          <Box
            backgroundColor="white"
            borderRadius="lg"
            p="6"
            maxW="600px"
            width="90%"
            maxHeight="90vh"
            overflow="auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="space-between" align="center" mb="4">
              <Heading size="md">Edit Event</Heading>
              <CloseButton onClick={onEditClose} />
            </Flex>

            <Stack gap="4">
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Title
                </Text>
                <Input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  placeholder="Event title"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Description
                </Text>
                <Textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  placeholder="Event description"
                  rows={3}
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Location
                </Text>
                <Input
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  placeholder="Event location"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Image URL
                </Text>
                <Input
                  value={editForm.imageLink}
                  onChange={(e) =>
                    setEditForm({ ...editForm, imageLink: e.target.value })
                  }
                  placeholder="Image URL"
                />
              </Box>
              <HStack gap="4">
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Start Date
                  </Text>
                  <Input
                    type="datetime-local"
                    value={
                      editForm.startDate
                        ? new Date(editForm.startDate)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditForm({ ...editForm, startDate: e.target.value })
                    }
                  />
                </Box>
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    End Date
                  </Text>
                  <Input
                    type="datetime-local"
                    value={
                      editForm.endDate
                        ? new Date(editForm.endDate).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditForm({ ...editForm, endDate: e.target.value })
                    }
                  />
                </Box>
              </HStack>
               <Box>
                 <Text fontSize="sm" fontWeight="500" mb="2">
                   Event Status
                 </Text>
                 <HStack>
                   <Button
                     size="sm"
                     variant={editForm.active ? "solid" : "outline"}
                     colorScheme={editForm.active ? "green" : "red"}
                     onClick={() => setEditForm({ ...editForm, active: !editForm.active })}
                   >
                     {editForm.active ? "Active" : "Inactive"}
                   </Button>
                   <Text fontSize="sm" color={editForm.active ? "green.600" : "red.600"}>
                     {editForm.active ? "Visible to users" : "Hidden from users"}
                   </Text>
                 </HStack>
               </Box>
            </Stack>

            <Flex gap="3" mt="6" justify="flex-end">
              <Button
                size="sm"
                variant="outline"
                color="red.500"
                borderColor="red.500"
                mr="auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOpen();
                }}
              >
                <Icon as={MdDelete} boxSize="4" mr="1" />
                Delete
              </Button>
              <Button variant="ghost" onClick={onEditClose}>
                Cancel
              </Button>
              <Button
                backgroundColor="goc.blue"
                color="white"
                onClick={handleEdit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleteOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex="9999"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onDeleteClose();
            }
          }}
        >
          <Box
            backgroundColor="white"
            borderRadius="lg"
            p="6"
            maxW="400px"
            width="90%"
            onClick={(e) => e.stopPropagation()}
          >
            <Heading size="md" mb="4">
              Delete Event
            </Heading>
            <Text>
              Are you sure you want to delete "{event.title}"? This action
              cannot be undone.
            </Text>
            <Text color="red" fontWeight="bold" mb="6">
              You should set finished events to inactive instead.
            </Text>
            <Flex gap="3" justify="flex-end">
              <Button onClick={onDeleteClose}>Cancel</Button>
              <Button
                backgroundColor="red.500"
                color="white"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  );
};
