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
import { useState } from "react";

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

  const hasDetails = !!(location || description);

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

  const handleMoreInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

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

      {/* Dark gradient overlay - extends when expanded */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background={
          expanded
            ? "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.75) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)"
        }
        transition="background 0.4s ease"
      />
      {/* Hover overlay - darkens bottom on hover */}
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

      {/* Text content container - fills card */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        flexDirection="column"
        p={{ base: "4", md: "5" }}
        pointerEvents="none"
      >
        {/* Inner content - slides from bottom to top */}
        <Box
          marginTop={expanded ? "0" : "auto"}
          transition="margin 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          pointerEvents="auto"
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
            <HStack gap="1.5" mb={expanded ? "3" : "0"}>
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

          {/* Expanded details */}
          <Box
            overflow="hidden"
            maxHeight={expanded ? "300px" : "0px"}
            opacity={expanded ? 1 : 0}
            transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {location && (
              <HStack gap="1.5" mb="2">
                <Icon
                  as={MdLocationPin}
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
              >
                {description.length > 200
                  ? `${description.substring(0, 200)}...`
                  : description}
              </Text>
            )}
          </Box>
          {/* Close inner content wrapper */}
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
          _hover={{ opacity: 1, backgroundColor: "whiteAlpha.200" }}
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
