/**
 * GalleryCardList - Renders a list of GalleryCard components
 */

import { GalleryCard } from "@/components/GalleryCard";
import { GalleryItem } from "@/pages/Gallery";
import { Grid, Stack, Text } from "@chakra-ui/react";
import GOCSpinner from "./GOCSpinner";

interface GalleryCardListProps {
  items: GalleryItem[];
  loading?: boolean;
}

export const GalleryCardList = ({
  items,
  loading = false,
}: GalleryCardListProps) => {
  if (loading) return <GOCSpinner />;

  if (items.length === 0) {
    return (
      <Stack marginY="1rem" align="center">
        <Text fontSize={{ base: "md", md: "xl" }} color="goc.blue">
          There are no galleries available!
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
      {items.map((item) => (
        <GalleryCard
          key={`${item.year}-${item.title}-${item.date}`}
          item={item}
        />
      ))}
    </Grid>
  );
};
