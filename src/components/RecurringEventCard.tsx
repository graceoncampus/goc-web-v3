/**
 * RecurringEventCard - Horizontal card layout for recurring events
 */

import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
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
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import {
  MdLocationPin,
  MdAccessTime,
  MdArrowForward,
  MdEdit,
  MdDelete,
  MdLink,
} from "react-icons/md";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import { updateRecurringEvent, deleteRecurringEvent } from "@/graphql/mutations";

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

interface RecurringEventCardProps {
  event: RecurringEvent;
  inATeam: boolean;
  onEventUpdate: () => void;
}

export const RecurringEventCard = ({
  event,
  inATeam,
  onEventUpdate,
}: RecurringEventCardProps) => {
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
  const {
    open: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();

  const [editForm, setEditForm] = useState({
    name: event.name,
    description: event.description,
    location: event.location,
    imageLink: event.imageLink,
    time: event.time,
    signupLink: event.signupLink || "",
    signupDeadline: event.signupDeadline || "",
    galleryLink: event.galleryLink || "",
    addToGoogleCalendar: event.addToGoogleCalendar,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEventClick = () => {
    onDetailsOpen();
  };

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      await client.graphql({
        query: updateRecurringEvent,
        variables: {
          input: {
            id: event.id,
            name: editForm.name,
            description: editForm.description,
            location: editForm.location,
            imageLink: editForm.imageLink,
            time: editForm.time,
            signupLink: editForm.signupLink || undefined,
            signupDeadline: editForm.signupDeadline || undefined,
            galleryLink: editForm.galleryLink || undefined,
            addToGoogleCalendar: editForm.addToGoogleCalendar,
          },
        },
      });
      console.log("Recurring event updated successfully");
      onEditClose();
      onEventUpdate();
    } catch (error) {
      console.error("Error updating recurring event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await client.graphql({
        query: deleteRecurringEvent,
        variables: {
          input: {
            id: event.id,
          },
        },
      });
      console.log("Recurring event deleted successfully");
      onDeleteClose();
      onEventUpdate();
    } catch (error) {
      console.error("Error deleting recurring event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Horizontal Card Layout */}
      <Box
        width="100%"
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        borderRadius="xl"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
          transform: "translateY(-2px)",
        }}
        cursor="pointer"
        onClick={handleEventClick}
        backgroundColor="white"
        border="1px solid"
        borderColor="gray.100"
        overflow="hidden"
        height={{ base: "auto", md: "180px" }}
      >
        {/* Image Section - Left side on desktop, top on mobile */}
        {event.imageLink && (
          <Box
            position="relative"
            width={{ base: "100%", md: "280px" }}
            height={{ base: "180px", md: "100%" }}
            flexShrink={0}
            overflow="hidden"
          >
            <Image
              src={event.imageLink}
              alt={event.name}
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.3s ease"
              _groupHover={{ transform: "scale(1.05)" }}
            />
          </Box>
        )}

        {/* Content Section */}
        <Flex
          flex="1"
          p={{ base: "4", md: "5" }}
          flexDirection="column"
          justify="space-between"
          minWidth={0}
        >
          <Box flex="1" minHeight={0}>
            {/* Title */}
            <Heading
              size={{ base: "md", md: "lg" }}
              color="goc.dark_blue"
              fontFamily="Poppins"
              fontWeight="600"
              mb="2"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {event.name}
            </Heading>

            {/* Time and Location */}
            <HStack gap="4" mb="2" flexWrap="wrap">
              <HStack gap="1.5" color="gray.600">
                <Icon as={MdAccessTime} color="goc.blue" boxSize="4" />
                <Text fontSize="sm" fontWeight="500">
                  {event.time}
                </Text>
              </HStack>
              {event.location && (
                <HStack gap="1.5" color="gray.600">
                  <Icon as={MdLocationPin} color="goc.blue" boxSize="4" />
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {event.location}
                  </Text>
                </HStack>
              )}
            </HStack>

            {/* Description Preview */}
            {event.description && (
              <Text
                fontSize="sm"
                color="gray.700"
                lineHeight="1.5"
                overflow="hidden"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {event.description}
              </Text>
            )}
          </Box>

          {/* Action Section */}
          <Flex
            mt="3"
            gap="2"
            align="center"
            justify="space-between"
            flexWrap="wrap"
          >
            <Button
              size="sm"
              backgroundColor="goc.blue"
              color="white"
              borderRadius="md"
              fontWeight="600"
              px="4"
              transition="all 0.2s ease"
              _hover={{
                backgroundColor: "goc.dark_blue",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleEventClick();
              }}
            >
              More
              <Icon as={MdArrowForward} boxSize="3.5" ml="1" />
            </Button>

            {/* Admin Actions */}
            {inATeam && (
              <HStack gap="2">
                <Button
                  size="sm"
                  variant="outline"
                  color="goc.blue"
                  borderColor="goc.blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditOpen();
                  }}
                >
                  <Icon as={MdEdit} boxSize="3.5" />
                </Button>
              </HStack>
            )}
          </Flex>
        </Flex>
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
              <Heading size="md">Edit Recurring Event</Heading>
              <CloseButton onClick={onEditClose} />
            </Flex>

            <Stack gap="4">
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Name *
                </Text>
                <Input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Event name"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Description *
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
                  Time *
                </Text>
                <Input
                  value={editForm.time}
                  onChange={(e) =>
                    setEditForm({ ...editForm, time: e.target.value })
                  }
                  placeholder="e.g., Every Sunday at 10:00 AM"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Location *
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
                  Image URL *
                </Text>
                <Input
                  value={editForm.imageLink}
                  onChange={(e) =>
                    setEditForm({ ...editForm, imageLink: e.target.value })
                  }
                  placeholder="Image URL"
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Signup Link (optional)
                </Text>
                <Input
                  value={editForm.signupLink}
                  onChange={(e) =>
                    setEditForm({ ...editForm, signupLink: e.target.value })
                  }
                  placeholder="https://..."
                />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Signup Deadline (optional)
                </Text>
                <Input
                  value={editForm.signupDeadline}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
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
                  value={editForm.galleryLink}
                  onChange={(e) =>
                    setEditForm({ ...editForm, galleryLink: e.target.value })
                  }
                  placeholder="Gallery URL"
                />
              </Box>
              <Box>
                <Checkbox.Root
                  checked={editForm.addToGoogleCalendar}
                  onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
                    setEditForm({
                      ...editForm,
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
              Delete Recurring Event
            </Heading>
            <Text mb="6">
              Are you sure you want to delete "{event.name}"? This action cannot
              be undone.
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

      {/* Event Details Modal */}
      {isDetailsOpen && (
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
              onDetailsClose();
            }
          }}
        >
          <Box
            backgroundColor="white"
            borderRadius="lg"
            p="6"
            maxW="800px"
            width="90%"
            maxHeight="90vh"
            overflow="auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="space-between" align="center" mb="4">
              <Heading size="xl" color="goc.dark_blue">
                {event.name}
              </Heading>
              <CloseButton onClick={onDetailsClose} />
            </Flex>

            <Stack gap="6">
              {/* Event Image */}
              {event.imageLink && (
                <Box borderRadius="lg" overflow="hidden" maxH="400px">
                  <Image
                    src={event.imageLink}
                    alt={event.name}
                    objectFit="cover"
                    width="100%"
                  />
                </Box>
              )}

              {/* Time */}
              <VStack align="start" gap="2">
                <HStack gap="2" color="gray.700">
                  <Icon as={MdAccessTime} color="goc.blue" boxSize="5" />
                  <Text fontSize="md" fontWeight="600">
                    {event.time}
                  </Text>
                </HStack>
              </VStack>

              {/* Location */}
              {event.location && (
                <VStack align="start" gap="2">
                  <HStack gap="2" color="gray.700">
                    <Icon as={MdLocationPin} color="goc.blue" boxSize="5" />
                    <Text fontSize="md" fontWeight="600">
                      {event.location}
                    </Text>
                  </HStack>
                </VStack>
              )}

              {/* Signup Link */}
              {event.signupLink && (
                <VStack align="start" gap="2">
                  <HStack gap="2" color="gray.700">
                    <Icon as={MdLink} color="goc.blue" boxSize="5" />
                    <Button
                      size="sm"
                      backgroundColor="goc.blue"
                      color="white"
                      _hover={{ backgroundColor: "goc.dark_blue" }}
                      onClick={() => window.open(event.signupLink, "_blank")}
                    >
                      Sign Up Here
                    </Button>
                  </HStack>
                  {event.signupDeadline && (
                    <Text fontSize="sm" color="gray.600" ml="7">
                      Deadline: {event.signupDeadline}
                    </Text>
                  )}
                </VStack>
              )}

              {/* Description */}
              {event.description && (
                <Box>
                  <Heading size="sm" mb="2" color="goc.dark_blue">
                    Description
                  </Heading>
                  <Text
                    fontSize="md"
                    color="gray.700"
                    lineHeight="1.6"
                    whiteSpace="pre-wrap"
                  >
                    {event.description}
                  </Text>
                </Box>
              )}

              {/* Gallery Link */}
              {event.galleryLink && (
                <Button
                  variant="outline"
                  color="goc.blue"
                  borderColor="goc.blue"
                  width="fit-content"
                  onClick={() => window.open(event.galleryLink, "_blank")}
                >
                  View Photo Gallery
                </Button>
              )}
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};
