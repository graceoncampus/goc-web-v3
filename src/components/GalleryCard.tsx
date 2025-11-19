/**
 * GalleryCard - Displays gallery information in a card format
 */

import { GalleryItem } from "@/pages/Gallery";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { MdCalendarToday, MdLocationPin } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";

interface GalleryCardProps {
  item: GalleryItem;
}

export const GalleryCard = ({ item }: GalleryCardProps) => {
  const {
    title,
    link,
    thumbnailUrl,
    year,
    startDate,
    endDate,
    location,
    description,
  } = item;
  const isWip = link === "WIP";
  const displayTitle = `${year} ${title}`;

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} at ${timeStr}`;
  };

  const formatTimeOnly = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isSameDay = (date1: string, date2: string) => {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startDateStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endDateOptions: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    if (start.getFullYear() !== end.getFullYear()) {
      endDateOptions.year = "numeric";
    }
    const endDateStr = end.toLocaleDateString("en-US", endDateOptions);

    const startTime = formatTimeOnly(startDate);
    const endTime = formatTimeOnly(endDate);

    return `${startDateStr} - ${endDateStr} (${startTime} - ${endTime})`;
  };

  const handleGalleryClick = () => {
    if (!isWip && link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Box
      width={{
        base: "100%",
        md: "calc(50% - 12px)",
        lg: "calc(33.333% - 16px)",
      }}
      minWidth="300px"
      height="550px"
      display="flex"
      flexDirection="column"
      borderRadius="xl"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transform: "translateY(-4px)",
      }}
      cursor={isWip ? "default" : "pointer"}
      onClick={handleGalleryClick}
      backgroundColor="white"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      position="relative"
      opacity={isWip ? 0.75 : 1}
    >
      {/* Image Section */}
      {thumbnailUrl && (
        <Box position="relative" height="200px" overflow="hidden">
          <Image
            src={thumbnailUrl}
            alt={`${displayTitle} gallery thumbnail`}
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
      <Box
        p={{ base: "4", md: "6" }}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        {/* Title */}
        <Flex justify="space-between" align="start" mb="3" gap="2">
          <Box flex="1" minWidth="0">
            <Heading
              size={{ base: "md", md: "lg" }}
              color="goc.dark_blue"
              fontFamily="Poppins"
              fontWeight="600"
              lineHeight="1.3"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {displayTitle}
            </Heading>
          </Box>
        </Flex>

        {/* Middle Content Section */}
        <Box
          height="180px"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* Date and Time */}
          <VStack align="start" gap="2" mb="4">
            {startDate && (
              <HStack gap="2" color="gray.600">
                <Icon as={MdCalendarToday} color="goc.blue" boxSize="4" />
                <Text fontSize="sm" fontWeight="500">
                  {endDate && isSameDay(startDate, endDate)
                    ? formatDateTime(startDate)
                    : endDate
                      ? formatDateRange(startDate, endDate)
                      : formatDateTime(startDate)}
                </Text>
              </HStack>
            )}
            {/* Location */}
            {location && (
              <HStack gap="2" color="gray.600">
                <Icon as={MdLocationPin} color="goc.blue" boxSize="4" />
                <Text fontSize="sm" fontWeight="500">
                  {location.length > 30
                    ? `${location.substring(0, 30)}...`
                    : location}
                </Text>
              </HStack>
            )}
          </VStack>

          {/* Description */}
          {description && (
            <Text
              fontSize="sm"
              color="gray.700"
              lineHeight="1.5"
              mb="4"
              height="60px"
              maxHeight="60px"
              overflow="hidden"
            >
              {description.length > 120
                ? `${description.substring(0, 120)}...`
                : description}
            </Text>
          )}
        </Box>

        {/* Divider */}
        <Box height="1px" backgroundColor="gray.200" mb="4" />

        {/* Action Button */}
        <Button
          size="md"
          width="100%"
          backgroundColor={isWip ? "gray.400" : "goc.blue"}
          color="white"
          borderRadius="lg"
          fontWeight="600"
          fontSize="sm"
          py="6"
          transition="all 0.2s ease"
          _hover={
            isWip
              ? {}
              : {
                  backgroundColor: "goc.dark_blue",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(51, 102, 204, 0.3)",
                }
          }
          _active={
            isWip
              ? {}
              : {
                  transform: "translateY(0)",
                }
          }
          onClick={(e) => {
            e.stopPropagation();
            handleGalleryClick();
          }}
          disabled={isWip}
        >
          {isWip ? "Coming Soon" : "View Gallery"}
          {!isWip && <Icon as={LuExternalLink} boxSize="4" ml="2" />}
        </Button>
      </Box>
    </Box>
  );
};
