import {
  Container,
  Input,
  HStack,
  Select,
  Portal,
  createListCollection,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { GalleryCardList } from "@/components/GalleryCardList";

/* TODO: Yeadam suggestions
- Sort events -- place "coming soon" at the top
- Parse thumnbail url for gallery link + static image (from backend)



FIX:
- Show normal-sized event when searching
- Move "all years" search to the right of search bar
- Text wrapping for event type

*/

export type GalleryItem = {
  year: number;
  eventType: string;
  title: string;
  date: string;
  link: string;
  thumbnailUrl?: string;
};

const items: GalleryItem[] = [
  {
    year: 2025,
    eventType: "Sports",
    title: "Broomball",
    date: "1/31/2025",
    link: "https://adobe.ly/3EUNZsO",
    // thumbnailUrl:
    //   "https://photos.adobe.io/v2/spaces/cda14325a11c4a5587090cb4d605d24c/assets/1586ff035c0b4ea4a6b2ae480368039f/revisions/adbeef4e4c2ed0f3998b3575e96290db/renditions/b9f760dcbd9f55323f3354b26eff6389",
  },
  {
    year: 2024,
    eventType: "Holiday",
    title: "GOC Christmas",
    date: "12/6/2024",
    link: "https://adobe.ly/40bPCup",
    // thumbnailUrl:
    //   "https://lightroom.adobe.com/shares/63aa178ffe584bdfba551f9329baf82b/albums/041b9231145548e2a5791fe6dd1b39fa/assets/464367b333034a6baf454629f14a02a3",
  },
  {
    year: 2024,
    eventType: "Worship",
    title: "Thanksgiving Worship Night",
    date: "11/25/2024",
    link: "WIP", // Keep as WIP
    // thumbnailUrl: undefined, // Example without thumbnail
  },
  {
    year: 2024,
    eventType: "Social",
    title: "Fall BBQ",
    date: "11/1/2024",
    link: "https://adobe.ly/3APt9cQ",
    thumbnailUrl: `https://lightroom.adobe.com/v2c/spaces/9be1ee9904f04c4ebb2df52165fc0f58/assets/0e4c6a79ed654b3fa44853ae13285182/revisions/067aaf5e2f8f285c1a81c45acc288b9d/renditions/478a2022cbc32b85b386044d9e25aad6`,
  },
  {
    year: 2024,
    eventType: "Outreach",
    title: "Freshman Flashlight Frenzy (FFF)",
    date: "10/23/2024",
    link: "https://adobe.ly/40mWbeg",
    // thumbnailUrl: `${placeholderThumbBase}/FFFF00/000000?text=FFF+2024`,
  },
  {
    year: 2024,
    eventType: "Large Group",
    title: "Large Group",
    date: "10/18/2024",
    link: "https://adobe.ly/42Yk5Ok",
    // thumbnailUrl: `${placeholderThumbBase}/FF00FF/FFFFFF?text=LG+Oct+2024`,
  },
  {
    year: 2024,
    eventType: "Large Group",
    title: "First Large Group/Ice Cream Social",
    date: "9/27/2024",
    link: "https://adobe.ly/3NgKePn",
    // thumbnailUrl: `${placeholderThumbBase}/00FFFF/000000?text=First+LG+2024`,
  },
  {
    year: 2024,
    eventType: "Social",
    title: "Beach Day",
    date: "9/25/2024",
    link: "https://adobe.ly/3BxNHq9",
    // thumbnailUrl: `${placeholderThumbBase}/FFA500/FFFFFF?text=Beach+Day+2024`,
  },
  {
    year: 2024,
    eventType: "Outreach",
    title: "Tour of Westwood",
    date: "9/24/2024",
    link: "https://adobe.ly/3zQuRtS",
    // thumbnailUrl: `${placeholderThumbBase}/800080/FFFFFF?text=Westwood+Tour`,
  },
  {
    year: 2024,
    eventType: "Outreach",
    title: "GOC Kickoff",
    date: "9/23/2024",
    link: "https://adobe.ly/48rIv3A",
    // thumbnailUrl: `${placeholderThumbBase}/A52A2A/FFFFFF?text=Kickoff+2024`,
  },
  {
    year: 2024,
    eventType: "Social",
    title: "Spring Banquet",
    date: "6/1/2024",
    link: "https://lightroom.adobe.com/shares/5faedaf80dad4b349e1681032094a530",
    // thumbnailUrl: `${placeholderThumbBase}/D2691E/FFFFFF?text=Banquet+2024`,
  },
];

// --- Main Page Component ---
export const GalleryPage = () => {
  return (
    <BannerTemplate
      title="Gallery"
      activeKey={NavbarActiveKey.GALLERY}
      imageSrc="/images/bible.jpg"
      alt="Photo Gallery page banner"
    >
      <GalleryBody />
    </BannerTemplate>
  );
};

// --- Gallery Body Component with Search and Filters ---
const GalleryBody = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  // Get unique years sorted descending for the dropdown
  const uniqueYears = Array.from(new Set(items.map((item) => item.year))).sort(
    (a, b) => b - a,
  ); // Newest first

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  // Combined filtering logic
  const filteredItems = items.filter((item) => {
    // Year Filter
    if (selectedYear && item.year.toString() !== selectedYear) {
      return false;
    }

    // Text Search Filter (across title, year, event type, date)
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase().replace(/\s+/g, "");
      // Construct a searchable string from relevant fields
      const searchableText = `
          ${item.title.toLowerCase().replace(/\s+/g, "")}
          ${item.year.toString()}
          ${item.eventType.toLowerCase().replace(/\s+/g, "")}
          ${item.date.toLowerCase().replace(/\s+/g, "")}
        `;
      if (!searchableText.includes(lowerCaseQuery)) {
        return false;
      }
    }

    // If item passes all filters, include it
    return true;
  });

  // Optionally add sorting logic here based on another state variable (e.g., sortBy)
  // filteredItems.sort((a, b) => { /* sort logic */ });

  // Create collection for years
  const yearCollection = createListCollection({
    items: uniqueYears.map((year) => ({
      label: year.toString(),
      value: year.toString(),
    })),
  });

  return (
    // Use container.xl for wider content area, adjust px
    <Container maxW="container.xl" py={8} px={{ base: 4, md: 8 }}>
      {/* Filter Controls Area */}
      <HStack
        gap={4}
        marginBottom={{ base: 6, md: 8 }}
        wrap="wrap"
        justifyContent="center"
      >
        {/* Text on its own line */}
        {/* Search Input */}
        <InputGroup
          flexGrow={1} // Allow search to take available space
          maxWidth={{ base: "100%", md: "30rem" }} // Max width on larger screens
          minWidth={{ base: "100%", sm: "20rem" }} // Min width on small screens+
          startElement={<LuSearch />}
        >
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search events by title, type, date..." // More specific placeholder
            rounded="2xl" // Match Sermons.tsx rounding
            borderColor="black" // Match Sermons.tsx border color
          />
        </InputGroup>

        {/* Updated Year Filter Dropdown */}
        <Select.Root
          value={selectedYear ? [selectedYear] : []}
          onValueChange={(details) => setSelectedYear(details.value[0] || "")}
          collection={yearCollection}
        >
          <Select.HiddenSelect />
          <Select.Control
            maxWidth={{ base: "100%", sm: "auto" }}
            minWidth={{ base: "100%", sm: "10rem" }}
            rounded="md"
            borderColor="gray.300"
          >
            <Select.Trigger>
              <Select.ValueText placeholder="All Years" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {yearCollection.items.map((year) => (
                  <Select.Item key={year.value} item={year}>
                    {year.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        {/* Add More Filters Here (e.g., Event Type) using Select or ButtonGroup */}
      </HStack>

      {/* Gallery Grid */}
      <GalleryCardList items={filteredItems} />
    </Container>
  );
};
