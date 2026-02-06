/**
 * GalleryCard - Displays gallery information as an image card with overlay text
 */

import { GalleryItem } from "@/pages/Gallery";
import { Box, Heading, Text, Image, Icon, HStack } from "@chakra-ui/react";
import { MdCalendarToday } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";

interface GalleryCardProps {
  item: GalleryItem;
}

export const GalleryCard = ({ item }: GalleryCardProps) => {
  const { title, link, thumbnailUrl, year, startDate, endDate } = item;
  const displayTitle = `${year} ${title}`;

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

      {/* Dark gradient overlay - heavier at bottom for text readability */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)"
      />
      {/* Hover overlay - darkens bottom on hover */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        background="linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)"
        opacity={0}
        transition="opacity 0.3s ease"
        className="gallery-hover-overlay"
      />

      {/* External link icon - top right */}
      <Box position="absolute" top="3" right="3">
        <Icon as={LuExternalLink} color="white" boxSize="5" opacity={0.8} />
      </Box>

      {/* Text content - bottom */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        p={{ base: "4", md: "5" }}
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
      </Box>
    </Box>
  );
};
