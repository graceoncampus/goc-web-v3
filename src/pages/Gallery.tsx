import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  Grid,
  Input,
  InputElement, // Changed from InputLeftElement
  VStack,
  HStack,
  Image as ChakraImage, // Import Image
  Skeleton,
  Select, // Change from ChakraSelect to Select
  Portal,
  createListCollection,
  SimpleGrid,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group"; // Import the custom InputGroup
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { LuExternalLink, LuImage, LuSearch } from "react-icons/lu";
import { useState } from "react";
import Logo from "@/components/Logo"; // Import the Logo component

// --- Updated Data Structure & Props ---

type GalleryItem = {
  year: number;
  eventType: string; // e.g., "Social", "Holiday", "Worship", "Outreach", "Sports"
  title: string; // Just the event name now
  date: string; // Keep full date for display
  link: string; // URL or "WIP"
  thumbnailUrl?: string; // Optional thumbnail URL
};

// Placeholder thumbnail URLs - replace with your actual ones
const placeholderThumbBase = "https://via.placeholder.com/300x150";

// Update items array with new structure and thumbnail placeholders
const items: GalleryItem[] = [
  {
    year: 2025,
    eventType: "Sports",
    title: "Broomball",
    date: "1/31/2025",
    link: "https://adobe.ly/3EUNZsO",
    // thumbnailUrl:
    //   "https://photos.adobe.io/v2/spaces/cda14325a11c4a5587090cb4d605d24c/assets/1586ff035c0b4ea4a6b2ae480368039f/revisions/adbeef4e4c2ed0f3998b3575e96290db/renditions/b9f760dcbd9f55323f3354b26eff6389",
    // thumbnailUrl: `${placeholderThumbBase}/FF0000/FFFFFF?text=Broomball+2025`,
  },
  {
    year: 2024,
    eventType: "Holiday",
    title: "GOC Christmas",
    date: "12/6/2024",
    link: "https://adobe.ly/40bPCup",
    // thumbnailUrl:
    //   "https://lightroom.adobe.com/shares/63aa178ffe584bdfba551f9329baf82b/albums/041b9231145548e2a5791fe6dd1b39fa/assets/464367b333034a6baf454629f14a02a3",
    // thumbnailUrl: `${placeholderThumbBase}/00FF00/FFFFFF?text=Christmas+2024`,
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
    // thumbnailUrl: `${placeholderThumbBase}/0000FF/FFFFFF?text=Fall+BBQ+2024`,
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
      <SimpleGrid minChildWidth={"18rem"} gap={6}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Section
              key={`${item.year}-${item.title}-${item.date}`}
              item={item}
            />
          ))
        ) : (
          // Message when no items match filters - span across all grid columns
          <Text gridColumn="1 / -1" textAlign="center" color="gray.500" py={10}>
            No galleries found matching your criteria.
          </Text>
        )}
      </SimpleGrid>
    </Container>
  );
};

// --- Individual Gallery Item Card Component ---
type SectionComponentProps = {
  item: GalleryItem;
};

const Section = ({ item }: SectionComponentProps) => {
  const { title, date, link, thumbnailUrl, year } = item;
  const isWip = link === "WIP";
  const displayTitle = `${year} ${title}`; // Construct display title

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.200"
      overflow="hidden"
      boxShadow="sm"
      width="100%"
      transition="all 0.25s ease-in-out"
      bg="white"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
      }}
      opacity={isWip ? 0.75 : 1}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      {/* Thumbnail Area */}
      <Box
        height="160px" // Fixed height for thumbnail consistency
        bg={thumbnailUrl ? "gray.100" : "goc.blue"} // Keep blue background
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden" // Ensure image fits
        position="relative" // For potential overlays if needed
      >
        {thumbnailUrl ? (
          <ChakraImage
            src={thumbnailUrl}
            alt={`Thumbnail for ${displayTitle}`}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        ) : (
          <Box width="fill" height="fill">
            <svg
              width="168"
              height="64"
              viewBox="0 0 84 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.5128 4.2294C27.5116 5.0941 28.2052 5.86778 28.2052 5.86778C28.2052 5.86778 27.7058 6.50493 27.2989 7.14208C26.8364 7.87025 26.4388 8.75316 26.2631 9.09904C25.8469 9.91823 25.2735 12.0754 25.1995 12.0481C25.1255 11.9571 24.7741 11.2289 24.1822 10.4097C23.7198 9.77259 23.1279 9.13544 22.7764 8.86238C21.2967 7.49706 19.9095 6.67787 17.2275 6.31378C16.3951 6.13174 15.5628 6.22276 14.7305 6.31378C13.0658 6.58684 11.4011 7.22399 10.1063 8.13421C9.18149 8.77136 8.0717 9.95463 7.33184 11.32C6.96191 12.0481 6.40701 13.3224 6.31453 13.7775C5.9446 15.598 6.03708 16.9633 6.31453 18.3286C6.68446 19.4209 7.05439 20.4221 7.5168 21.2413C7.97922 21.9694 8.25666 22.2425 8.44163 22.4246C9.27397 23.3348 10.3838 24.154 11.4011 24.7911C12.5109 25.3372 13.7131 25.7013 14.8229 25.8834C15.3778 25.9744 16.2102 25.9744 16.95 25.9744C17.4125 25.8834 17.8749 25.8834 18.2448 25.7923C19.4471 25.5193 20.1869 25.1552 20.4644 25.0642C21.8516 24.5181 23.7013 22.9707 24.7186 21.6054C25.4585 20.5131 26.0133 18.9657 26.0133 18.9657H20.0945C20.0945 18.9657 19.3546 18.8747 18.7072 18.6017C18.2078 18.3286 17.7824 17.9645 17.4679 17.4184C17.098 16.7812 17.0055 15.871 17.3755 15.1429C17.6529 14.4147 18.3003 13.9596 18.7627 13.732C19.4101 13.3679 20.2424 13.3679 20.2424 13.3679H26.6237C26.6237 13.3679 26.9567 11.0014 28.0387 8.90789C28.4086 8.0887 29.056 7.06016 29.5184 6.45031C29.9439 5.86778 30.6282 4.99398 31.3219 4.35683C32.4317 3.26457 33.7264 2.31795 34.8085 1.77182C36.2882 1.04365 36.8431 0.861609 38.6002 0.360992C39.5251 0.087928 41.9296 -0.0941182 43.8255 0.0515159C45.7677 0.178946 47.5248 0.634053 48.2185 0.898014C50.9929 1.99027 52.8426 3.57404 53.5824 4.35683C54.5073 5.23973 55.5246 6.66877 55.5246 6.66877C56.172 5.84958 56.5419 5.48549 56.9118 5.03038C57.6517 4.21119 58.1141 3.93813 59.0389 3.20996C60.1487 2.29974 61.7209 1.48055 62.8307 1.11646C64.2179 0.570336 65.6422 0.206252 67.2236 0.115231C69.2583 -0.157833 71.2466 0.115231 72.9298 0.570337C73.8361 0.79789 75.4269 1.33492 76.9066 2.20872C78.4325 3.11894 79.9585 4.39324 81.1608 5.84958C82.1504 6.94183 83.0104 8.39817 83.4729 9.58145C83.7503 10.1276 84 10.6282 84 10.9468C84 12.6307 80.9943 13.1677 80.2082 13.0403C79.1354 12.8582 78.2938 12.4486 78.0349 11.9844C77.8499 11.6931 77.6834 11.3291 77.4985 10.9832C77.1285 10.255 76.6014 9.52683 75.4084 8.43458C74.6685 7.79743 73.1888 6.88722 71.8015 6.50493C69.286 5.74035 67.7323 6.01341 66.6965 6.23186C65.6792 6.41391 63.5521 7.09656 61.7024 8.81687C60.2227 10.1822 59.3904 11.9116 59.0204 13.0676C58.4655 14.706 58.6505 15.7982 58.4655 17.5276C58.2806 19.4846 57.7257 21.2595 57.2633 22.2607C56.6159 23.7535 55.3674 26.4022 52.0842 28.9053C50.6045 29.9975 48.9398 30.8167 46.9052 31.4539C45.4994 31.8362 43.6683 32 42.2533 32C40.4037 32 38.3135 31.5449 36.9818 31.0898C34.2073 30.1796 32.6166 28.7232 32.145 28.3591C30.7577 27.2669 29.2317 25.4101 29.2317 25.4101C29.2317 25.4101 26.1428 30.0521 20.1684 31.463C18.291 31.9181 16.2564 32.1001 14.1108 31.7633C10.7814 31.3082 7.91448 29.9975 6.06482 28.3956C4.67758 27.3033 3.25335 25.7377 2.18055 23.9355C0.885796 21.751 0.238414 19.2934 0.0534483 17.291C-0.131517 15.2521 0.145935 12.4668 1.16325 10.0639C1.94935 8.15241 3.19786 6.45942 4.40014 5.14871C5.78738 3.62865 7.68327 2.36346 9.57917 1.50786C11.5213 0.688664 13.4264 0.324584 14.9432 0.233563C16.0807 0.142541 17.6252 0.197151 18.9199 0.415603C20.5106 0.688667 21.9071 1.2348 22.8227 1.59888C23.914 2.05399 25.5972 3.10983 26.707 4.05646L26.5128 4.2294ZM42.429 5.93149C36.7876 5.93149 32.2559 10.519 32.2559 16.2169C32.2559 21.8875 36.7876 26.5023 42.429 26.5023C48.0705 26.5023 52.6021 21.8966 52.6021 16.2169C52.6021 10.5736 48.015 5.99521 42.429 5.99521V5.93149ZM62.4238 23.9264C60.5741 22.379 59.6493 20.4676 59.5568 20.5222C59.4643 20.5222 58.817 22.7067 58.2158 23.981C57.7904 24.8912 56.5511 26.5569 56.5511 26.5569C56.5511 26.5569 58.0309 28.1953 59.9268 29.4696C61.388 30.4162 63.2561 31.108 63.811 31.2263C64.2734 31.3173 65.6607 31.7725 67.4179 31.8635C68.2317 31.9363 69.0825 31.9363 69.9149 31.8635C70.3773 31.8453 70.9322 31.7724 71.3946 31.6814C73.7067 31.4084 76.2777 30.043 76.7309 29.77C77.3505 29.4787 78.7655 28.5594 80.0602 27.3124C81.207 26.2201 82.1873 24.7638 82.4648 24.2814C83.1677 23.0981 83.9445 21.8511 83.7133 21.0956C83.4359 20.3675 82.696 19.5483 81.4012 19.1842C80.014 18.8201 78.9967 19.0568 78.562 19.3662C78.1921 19.6393 78.0071 19.6393 77.6372 20.4585C77.5447 20.7316 77.0823 21.6418 76.3424 22.5065C75.6303 23.2802 74.7887 23.9628 74.2153 24.3724C72.9206 25.1916 71.4409 25.7377 70.1461 25.9198C68.8513 26.0381 67.834 25.9198 67.2791 25.9198C66.1693 25.7559 63.9035 25.1006 62.3776 23.8263"
                style={{
                  fill: "#ffffff",
                }}
              />
            </svg>
          </Box>
        )}
      </Box>

      {/* Text Content Area */}
      <VStack
        align="flex-start"
        gap={1} // Reduced spacing between text elements
        p={4}
        flexGrow={1} // Allow this section to grow and push link down
      >
        <Heading
          as="h3"
          fontSize="md"
          fontWeight="semibold"
          lineHeight="short"
          truncate
        >
          {displayTitle}
        </Heading>
        <Text fontSize="xs" color="gray.500" pb={2}>
          {" "}
          {/* Smaller date, more padding bottom */}
          {date}
        </Text>
      </VStack>

      {/* Link Area (at the bottom) */}
      <Box px={4} pb={4} pt={1}>
        <Link
          fontSize="sm"
          fontWeight="medium" // Make link slightly bolder
          href={!isWip ? link : undefined} // Disable href if WIP
          target={!isWip ? "_blank" : undefined} // Only open new tab if not WIP
          rel={!isWip ? "noopener noreferrer" : undefined} // Security for _blank
          color={isWip ? "gray.500" : "blue.600"} // Use Chakra's blue, distinct WIP color
          display="inline-flex" // Use inline-flex for icon alignment
          alignItems="center"
          gap={1.5} // Slightly more gap
          cursor={isWip ? "default" : "pointer"} // Change cursor for WIP
          onClick={(e) => isWip && e.preventDefault()} // Prevent navigation if WIP
          _hover={{ textDecoration: isWip ? "none" : "underline" }} // Underline on hover unless WIP
        >
          {isWip ? null : <LuExternalLink size={14} />} {/* Hide icon if WIP */}
          {isWip ? "Coming Soon" : "View Gallery"} {/* Change text if WIP */}
        </Link>
      </Box>
    </Box>
  );
};
