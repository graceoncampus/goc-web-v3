/**
 * GalleryCardList - Renders a list of GalleryCard components
 */

import { GalleryCard } from "@/components/GalleryCard";
import { GalleryItem } from "@/pages/Gallery";
import { Flex, Text, Stack } from "@chakra-ui/react";

interface GalleryCardListProps {
  items: GalleryItem[];
  loading?: boolean;
}

export const GalleryCardList = ({
  items,
  loading = false,
}: GalleryCardListProps) => {
  if (loading) {
    return (
      <Stack marginY="1rem" align="center">
        <Text fontSize={{ base: "md", md: "xl" }} color="goc.blue">
          Loading galleries...
        </Text>
      </Stack>
    );
  }

  if (items.length === 0) {
    return (
      <Stack marginY="1rem" align="center">
        <Text fontSize={{ base: "md", md: "xl" }} color="gray.500">
          No galleries found matching your criteria.
        </Text>
      </Stack>
    );
  }

  return (
    <Flex
      wrap="wrap"
      gap="6"
      justify="flex-start"
      align="start"
      px="4"
      maxW="100%"
      width="100%"
    >
      {items.map((item) => (
        <GalleryCard
          key={`${item.year}-${item.title}-${item.date}`}
          item={item}
        />
      ))}
    </Flex>
  );
};
