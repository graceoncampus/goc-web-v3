/**
 * GalleryCard - Displays gallery information as an image card with overlay text
 */

import { GalleryItem } from "@/pages/Gallery";
import {
  Box,
  Heading,
  Text,
  Image,
  Icon,
  HStack,
  Button,
} from "@chakra-ui/react";
import { MdCalendarToday, MdLocationPin, MdInfoOutline } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import { useState, useRef, useCallback } from "react";

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
  const displayTitle = `${year} ${title}`;
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const expandTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDetails = !!(location || description);

  // If location is short enough to be one line (~40 chars), allow 5 lines for description
  const isLocationOneLine = !location || location.length <= 40;
  const descriptionLines = isLocationOneLine ? 5 : 4;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateDisplay = () => {
    if (!startDate) return "";
    const start = formatDate(startDate);
    if (endDate) {
      const end = formatDate(endDate);
      if (start === end) return start;
      return `${start} - ${end}`;
    }
    return start;
  };

  const handleGalleryClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleMoreInfo = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!expanded) {
        // Expanding: slide up first, then fade in details after slide starts
        if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
        setExpanded(true);
        expandTimerRef.current = setTimeout(() => setShowDetails(true), 100);
      } else {
        // Collapsing: hide details instantly, then slide down
        if (expandTimerRef.current) clearTimeout(expandTimerRef.current);
        setShowDetails(false);
        collapseTimerRef.current = setTimeout(() => setExpanded(false), 10);
      }
    },
    [expanded],
  );

  return (
    <Box
      role="group"
      width="100%"
      /* 3:2 aspect ratio to show full image (2048x1365) */
      paddingBottom="66.67%"
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      onClick={handleGalleryClick}
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transform: "translateY(-4px)",
        "& .gallery-hover-overlay": {
          opacity: 1,
        },
      }}
    >
      {/* Background Image */}
      <Image
        src={thumbnailUrl}
        alt={`${displayTitle} gallery`}
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="cover"
      />

      {/* Default bottom gradient - always present, matches original */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)"
        pointerEvents="none"
      />

      {/* Expanded gradient - fades in when details are shown */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.7) 100%)"
        opacity={expanded ? 1 : 0}
        transition="opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)"
        pointerEvents="none"
      />

      {/* Hover overlay - darkens bottom on hover (non-expanded only) */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)"
        opacity={expanded ? 0 : undefined}
        transition="opacity 0.3s ease"
        className="gallery-hover-overlay"
        style={{ opacity: expanded ? 0 : undefined }}
      />

      {/* External link icon - top right */}
      <Box position="absolute" top="3" right="3">
        <Icon as={LuExternalLink} color="white" boxSize="5" opacity={0.8} />
      </Box>

      {/* Text content container - fills card, content anchored to bottom */}
      <Box
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        top="0"
        pointerEvents="none"
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        {/* Inner content wrapper - capped to card height */}
        <Box
          position="relative"
          p={{ base: "4", md: "5" }}
          pointerEvents="auto"
          maxHeight="100%"
          overflow="hidden"
        >
          <Heading
            size={{ base: "md", md: "lg" }}
            color="white"
            fontFamily="Poppins"
            fontWeight="600"
            lineHeight="1.3"
            mb="1"
            textShadow="0 1px 3px rgba(0,0,0,0.4)"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {displayTitle}
          </Heading>

          {startDate && (
            <HStack gap="1.5">
              <Icon
                as={MdCalendarToday}
                color="whiteAlpha.900"
                boxSize="3.5"
                flexShrink={0}
              />
              <Text
                fontSize="sm"
                color="whiteAlpha.900"
                fontWeight="500"
                textShadow="0 1px 2px rgba(0,0,0,0.4)"
              >
                {formatDateDisplay()}
              </Text>
            </HStack>
          )}

          {/* Expanded details - grid trick for smooth height animation */}
          <Box
            display="grid"
            gridTemplateRows={expanded ? "1fr" : "0fr"}
            transition="grid-template-rows 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)"
          >
            <Box overflow="hidden">
              <Box
                pt="3"
                pb="7"
                opacity={showDetails ? 1 : 0}
                transition={
                  showDetails ? "opacity 0.25s ease 0.05s" : "opacity 0s ease"
                }
              >
                {location && (
                  <HStack gap="1.5" mb="2" alignItems="flex-start">
                    <Icon
                      as={MdLocationPin}
                      color="whiteAlpha.900"
                      boxSize="3.5"
                      flexShrink={0}
                      mt="0.5"
                    />
                    <Text
                      fontSize="sm"
                      color="whiteAlpha.900"
                      fontWeight="500"
                      textShadow="0 1px 2px rgba(0,0,0,0.4)"
                      lineHeight="1.3"
                    >
                      {location}
                    </Text>
                  </HStack>
                )}

                {description && (
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.800"
                    lineHeight="1.5"
                    mt="2"
                    textShadow="0 1px 2px rgba(0,0,0,0.3)"
                    lineClamp={descriptionLines}
                  >
                    {description.length > 180
                      ? `${description.substring(0, 175)}...`
                      : description}
                  </Text>
                )}
              </Box>
              {/* Close expanded details */}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* More Info button - bottom right */}
      {hasDetails && (
        <Button
          position="absolute"
          bottom="3"
          right="3"
          size="xs"
          variant="ghost"
          color="white"
          fontSize="xs"
          fontWeight="500"
          opacity={0.9}
          backgroundColor={{ base: "whiteAlpha.300", md: "transparent" }}
          _hover={{ opacity: 1, backgroundColor: "whiteAlpha.300" }}
          onClick={handleMoreInfo}
          transition="all 0.2s ease"
          borderRadius="full"
          px="3"
        >
          <Icon as={MdInfoOutline} boxSize="3.5" mr="1" />
          {expanded ? "Less" : "More Info"}
        </Button>
      )}
    </Box>
  );
};
