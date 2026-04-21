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
  Checkbox,
} from "@chakra-ui/react";
import {
  MdLocationPin,
  MdCalendarToday,
  MdAccessTime,
  MdArrowForward,
  MdEdit,
  MdDelete,
  MdLink,
} from "react-icons/md";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import {
  updateGOCEvents,
  deleteGOCEvents,
  updateRecurringEvent,
  deleteRecurringEvent,
} from "@/graphql/mutations";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import {
  formatDateInPST,
  formatTimeInPST,
  formatDateTimeInPST,
  isSameDayInPST,
  utcToPST,
  pstToUTC,
} from "@/utils/timezone";

export interface RegularCardEvent {
  kind: "event";
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  price?: number;
  location: string;
  description: string;
  imageLink: string;
  active?: boolean;
  galleryLink?: string;
}

export interface RecurringCardEvent {
  kind: "recurring";
  id: string;
  title: string;
  time: string;
  location: string;
  description: string;
  imageLink: string;
  galleryLink?: string;
  signupLink?: string;
  signupDeadline?: string;
  addToGoogleCalendar: boolean;
}

export type CardEvent = RegularCardEvent | RecurringCardEvent;

interface EventCardProps {
  event: CardEvent;
  inATeam: boolean;
  onEventUpdate: () => void;
}

export const EventCard = ({
  event,
  inATeam,
  onEventUpdate,
}: EventCardProps) => {
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
    title: event.title,
    description: event.description,
    location: event.location,
    imageLink: event.imageLink,
    galleryLink: event.galleryLink ?? "",
    // event-specific
    startDate: event.kind === "event" ? event.startDate : "",
    endDate: event.kind === "event" ? (event.endDate ?? "") : "",
    active: event.kind === "event" ? (event.active ?? true) : true,
    // recurring-specific
    time: event.kind === "recurring" ? event.time : "",
    signupLink: event.kind === "recurring" ? (event.signupLink ?? "") : "",
    signupDeadline:
      event.kind === "recurring" ? (event.signupDeadline ?? "") : "",
    addToGoogleCalendar:
      event.kind === "recurring" ? event.addToGoogleCalendar : false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDateTime = (dateString: string) =>
    formatDateTimeInPST(dateString);
  const isSameDay = (d1: string, d2: string) => isSameDayInPST(d1, d2);

  const formatDateRange = (
    startDate: string,
    endDate: string,
    compact = false,
  ) => {
    if (!startDate || !endDate) return "";
    if (compact) {
      const s = formatDateInPST(startDate, { month: "short", day: "numeric" });
      const e = formatDateInPST(endDate, { month: "short", day: "numeric" });
      return `${s}-${e} ${formatTimeInPST(startDate)}-${formatTimeInPST(endDate)}`;
    }
    const startYear = new Date(
      new Date(startDate).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
    ).getFullYear();
    const endYear = new Date(
      new Date(endDate).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      }),
    ).getFullYear();
    const endOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    if (startYear !== endYear) endOptions.year = "numeric";
    return `${formatDateInPST(startDate, { month: "short", day: "numeric" })} - ${formatDateInPST(endDate, endOptions)} (${formatTimeInPST(startDate)} - ${formatTimeInPST(endDate)})`;
  };

  const timeDisplay =
    event.kind === "event"
      ? event.endDate && isSameDay(event.startDate, event.endDate)
        ? formatDateTime(event.startDate)
        : event.endDate
          ? formatDateRange(event.startDate, event.endDate, true)
          : formatDateTime(event.startDate)
      : event.time;

  const timeIcon = event.kind === "event" ? MdCalendarToday : MdAccessTime;

  const handleEdit = async () => {
    setIsSubmitting(true);
    try {
      if (event.kind === "event") {
        const updateData: any = {
          id: event.id,
          title: editForm.title,
          description: editForm.description,
          location: editForm.location,
          imageLink: editForm.imageLink,
          active: editForm.active,
          startDate: editForm.startDate,
          endDate: editForm.endDate || undefined,
          galleryLink: editForm.galleryLink || undefined,
        };
        if (
          editForm.startDate?.length === 16 &&
          !editForm.startDate.endsWith("Z")
        )
          updateData.startDate = pstToUTC(editForm.startDate);
        if (editForm.endDate?.length === 16 && !editForm.endDate.endsWith("Z"))
          updateData.endDate = pstToUTC(editForm.endDate);
        await client.graphql({
          query: updateGOCEvents,
          variables: { input: updateData },
        });
      } else {
        await client.graphql({
          query: updateRecurringEvent,
          variables: {
            input: {
              id: event.id,
              name: editForm.title,
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
      }
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
      if (event.kind === "event") {
        await client.graphql({
          query: deleteGOCEvents,
          variables: { input: { id: event.id } },
        });
      } else {
        await client.graphql({
          query: deleteRecurringEvent,
          variables: { input: { id: event.id } },
        });
      }
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
      {/* Horizontal Card */}
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
        onClick={onDetailsOpen}
        backgroundColor="white"
        border="1px solid"
        borderColor="gray.100"
        overflow="hidden"
        height={{ base: "auto", md: "180px" }}
      >
        {event.imageLink && (
          <Box
            width={{ base: "100%", md: "280px" }}
            height={{ base: "180px", md: "100%" }}
            flexShrink={0}
            overflow="hidden"
          >
            <Image
              src={event.imageLink}
              alt={event.title}
              objectFit="cover"
              width="100%"
              height="100%"
              transition="transform 0.3s ease"
            />
          </Box>
        )}

        <Flex
          flex="1"
          p={{ base: "4", md: "5" }}
          flexDirection="column"
          justify="space-between"
          minWidth={0}
        >
          <Box flex="1" minHeight={0} overflow="hidden">
            {/* Title + badge */}
            <Flex justify="space-between" align="start" mb="2" gap="2">
              <Heading
                size={{ base: "md", md: "lg" }}
                color="goc.dark_blue"
                fontFamily="Poppins"
                fontWeight="600"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                flex="1"
                minWidth={0}
              >
                {event.title}
              </Heading>
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
              {event.kind === "event" && event.active !== true && (
                <Badge
                  bgColor="red.500"
                  variant="solid"
                  fontSize="xs"
                  px="2"
                  py="1"
                  borderRadius="md"
                  flexShrink={0}
                >
                  Inactive
                </Badge>
              )}
            </Flex>

            {/* Time + Location */}
            <HStack gap="4" mb="2" overflow="hidden">
              <HStack
                gap="1.5"
                color="gray.600"
                flexShrink={0}
                minWidth={0}
                overflow="hidden"
              >
                <Icon
                  as={timeIcon}
                  color="goc.blue"
                  boxSize="4"
                  flexShrink={0}
                />
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {timeDisplay}
                </Text>
              </HStack>
              {event.location && (
                <HStack
                  gap="1.5"
                  color="gray.600"
                  minWidth={0}
                  overflow="hidden"
                >
                  <Icon
                    as={MdLocationPin}
                    color="goc.blue"
                    boxSize="4"
                    flexShrink={0}
                  />
                  <Text
                    fontSize="sm"
                    fontWeight="500"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {event.location}
                  </Text>
                </HStack>
              )}
            </HStack>

            {/* Description */}
            {event.description && (
              <Text
                fontSize="sm"
                color="gray.700"
                lineHeight="1.5"
                overflow="hidden"
                style={
                  {
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  } as React.CSSProperties
                }
              >
                {event.description}
              </Text>
            )}
          </Box>
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
            if (e.target === e.currentTarget) onEditClose();
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
              <Heading size="md">
                Edit {event.kind === "event" ? "Event" : "Recurring Event"}
              </Heading>
              <CloseButton onClick={onEditClose} />
            </Flex>

            <Stack gap="4">
              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  {event.kind === "event" ? "Title" : "Name"} *
                </Text>
                <Input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  placeholder={
                    event.kind === "event" ? "Event title" : "Event name"
                  }
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

              {event.kind === "recurring" && (
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
              )}

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

              {event.kind === "event" && (
                <HStack gap="4">
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="500" mb="2">
                      Start Date (PST)
                    </Text>
                    <Input
                      type="datetime-local"
                      value={
                        editForm.startDate ? utcToPST(editForm.startDate) : ""
                      }
                      onChange={(e) =>
                        setEditForm({ ...editForm, startDate: e.target.value })
                      }
                    />
                  </Box>
                  <Box flex="1">
                    <Text fontSize="sm" fontWeight="500" mb="2">
                      End Date (PST)
                    </Text>
                    <Input
                      type="datetime-local"
                      value={editForm.endDate ? utcToPST(editForm.endDate) : ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, endDate: e.target.value })
                      }
                    />
                  </Box>
                </HStack>
              )}

              {event.kind === "recurring" && (
                <>
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
                </>
              )}

              <Box>
                <Text fontSize="sm" fontWeight="500" mb="2">
                  Gallery URL (optional)
                </Text>
                <Input
                  value={editForm.galleryLink}
                  onChange={(e) =>
                    setEditForm({ ...editForm, galleryLink: e.target.value })
                  }
                  placeholder="Gallery URL"
                />
              </Box>

              {event.kind === "event" && (
                <Box>
                  <Text fontSize="sm" fontWeight="500" mb="2">
                    Event Status
                  </Text>
                  <HStack>
                    <Button
                      size="sm"
                      variant={editForm.active ? "solid" : "outline"}
                      colorScheme={editForm.active ? "green" : "red"}
                      onClick={() =>
                        setEditForm({ ...editForm, active: !editForm.active })
                      }
                    >
                      {editForm.active ? "Active" : "Inactive"}
                    </Button>
                    <Text
                      fontSize="sm"
                      color={editForm.active ? "green.600" : "red.600"}
                    >
                      {editForm.active
                        ? "Visible to users"
                        : "Hidden from events (can be found on gallery page)"}
                    </Text>
                  </HStack>
                </Box>
              )}

              {event.kind === "recurring" && (
                <Box>
                  <Checkbox.Root
                    checked={editForm.addToGoogleCalendar}
                    onCheckedChange={(details: {
                      checked: boolean | "indeterminate";
                    }) =>
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
                      _hover={{ borderColor: "goc.dark_blue" }}
                    />
                    <Checkbox.Label>Add to Google Calendar</Checkbox.Label>
                  </Checkbox.Root>
                </Box>
              )}
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

      {/* Delete Confirmation */}
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
            if (e.target === e.currentTarget) onDeleteClose();
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
              Delete {event.kind === "event" ? "Event" : "Recurring Event"}
            </Heading>
            <Text>
              Are you sure you want to delete "{event.title}"? This action
              cannot be undone.
            </Text>
            {event.kind === "event" && (
              <Text color="red" fontWeight="bold" mb="6">
                You should set finished events to inactive instead.
              </Text>
            )}
            <Flex gap="3" justify="flex-end" mt="6">
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

      {/* Details Modal */}
      <DialogRoot
        open={isDetailsOpen}
        onOpenChange={(e) => {
          if (!e.open) onDetailsClose();
        }}
      >
        <DialogContent maxW="800px" width="90%">
          <DialogHeader>
            <DialogTitle fontSize="2xl" color="goc.dark_blue">
              {event.title}
            </DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <Stack gap="6">
              {event.imageLink && (
                <Box borderRadius="lg" overflow="hidden" maxH="400px">
                  <Image
                    src={event.imageLink}
                    alt={event.title}
                    objectFit="cover"
                    width="100%"
                  />
                </Box>
              )}

              {/* Time */}
              <VStack align="start" gap="2">
                <HStack gap="2" color="gray.700">
                  <Icon as={timeIcon} color="goc.blue" boxSize="5" />
                  <Text fontSize="md" fontWeight="600">
                    {event.kind === "event"
                      ? event.endDate &&
                        isSameDay(event.startDate, event.endDate)
                        ? formatDateTime(event.startDate)
                        : event.endDate
                          ? formatDateRange(event.startDate, event.endDate)
                          : formatDateTime(event.startDate)
                      : event.time}
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

              {/* Signup link (recurring only) */}
              {event.kind === "recurring" && event.signupLink && (
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

              {/* Gallery link */}
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

              {/* Inactive badge (event only) */}
              {event.kind === "event" && event.active !== true && (
                <Badge
                  colorScheme="red"
                  variant="solid"
                  fontSize="sm"
                  px="3"
                  py="1"
                  borderRadius="md"
                  width="fit-content"
                >
                  Inactive Event
                </Badge>
              )}
            </Stack>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};
