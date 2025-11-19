import {
  Container,
  Input,
  HStack,
  Flex,
  Box,
  Select,
  Portal,
  createListCollection,
  Stack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { LuSearch } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";
import { GalleryCardList } from "@/components/GalleryCardList";
import { listGOCEvents } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import GOCSpinner from "@/components/GOCSpinner";

/* TODO: Yeadam suggestions
- Sort events -- place "coming soon" at the top
- Parse thumnbail url for gallery link + static image (from backend)

FIX:
- Filter dropdown should have equal width as filter
*/

export type GalleryItem = {
  year: number;
  eventType: string;
  title: string;
  date: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
  link: string;
  thumbnailUrl?: string;
};

// Test events - commented out, now using GraphQL events
// const items: GalleryItem[] = [
//   {
//     year: 2025,
//     eventType: "Sports",
//     title: "Broomball",
//     date: "1/31/2025",
//     link: "https://adobe.ly/3EUNZsO",
//     // thumbnailUrl:
//     //   "https://photos.adobe.io/v2/spaces/cda14325a11c4a5587090cb4d605d24c/assets/1586ff035c0b4ea4a6b2ae480368039f/revisions/adbeef4e4c2ed0f3998b3575e96290db/renditions/b9f760dcbd9f55323f3354b26eff6389",
//   },
//   {
//     year: 2024,
//     eventType: "Holiday",
//     title: "GOC Christmas",
//     date: "12/6/2024",
//     link: "https://adobe.ly/40bPCup",
//     // thumbnailUrl:
//     //   "https://lightroom.adobe.com/shares/63aa178ffe584bdfba551f9329baf82b/albums/041b9231145548e2a5791fe6dd1b39fa/assets/464367b333034a6baf454629f14a02a3",
//   },
//   {
//     year: 2024,
//     eventType: "Worship",
//     title: "Thanksgiving Worship Night",
//     date: "11/25/2024",
//     link: "WIP", // Keep as WIP
//     // thumbnailUrl: undefined, // Example without thumbnail
//   },
//   {
//     year: 2024,
//     eventType: "Social",
//     title: "Fall BBQ",
//     date: "11/1/2024",
//     link: "https://adobe.ly/3APt9cQ",
//     thumbnailUrl: `https://lightroom.adobe.com/v2c/spaces/9be1ee9904f04c4ebb2df52165fc0f58/assets/0e4c6a79ed654b3fa44853ae13285182/revisions/067aaf5e2f8f285c1a81c45acc288b9d/renditions/478a2022cbc32b85b386044d9e25aad6`,
//   },
//   {
//     year: 2024,
//     eventType: "Outreach",
//     title: "Freshman Flashlight Frenzy (FFF)",
//     date: "10/23/2024",
//     link: "https://adobe.ly/40mWbeg",
//     // thumbnailUrl: `${placeholderThumbBase}/FFFF00/000000?text=FFF+2024`,
//   },
//   {
//     year: 2024,
//     eventType: "Large Group",
//     title: "Large Group",
//     date: "10/18/2024",
//     link: "https://adobe.ly/42Yk5Ok",
//     // thumbnailUrl: `${placeholderThumbBase}/FF00FF/FFFFFF?text=LG+Oct+2024`,
//   },
//   {
//     year: 2024,
//     eventType: "Large Group",
//     title: "First Large Group/Ice Cream Social",
//     date: "9/27/2024",
//     link: "https://adobe.ly/3NgKePn",
//     // thumbnailUrl: `${placeholderThumbBase}/00FFFF/000000?text=First+LG+2024`,
//   },
//   {
//     year: 2024,
//     eventType: "Social",
//     title: "Beach Day",
//     date: "9/25/2024",
//     link: "https://adobe.ly/3BxNHq9",
//     // thumbnailUrl: `${placeholderThumbBase}/FFA500/FFFFFF?text=Beach+Day+2024`,
//   },
//   {
//     year: 2024,
//     eventType: "Outreach",
//     title: "Tour of Westwood",
//     date: "9/24/2024",
//     link: "https://adobe.ly/3zQuRtS",
//     // thumbnailUrl: `${placeholderThumbBase}/800080/FFFFFF?text=Westwood+Tour`,
//   },
//   {
//     year: 2024,
//     eventType: "Outreach",
//     title: "GOC Kickoff",
//     date: "9/23/2024",
//     link: "https://adobe.ly/48rIv3A",
//     // thumbnailUrl: `${placeholderThumbBase}/A52A2A/FFFFFF?text=Kickoff+2024`,
//   },
//   {
//     year: 2024,
//     eventType: "Social",
//     title: "Spring Banquet",
//     date: "6/1/2024",
//     link: "https://lightroom.adobe.com/shares/5faedaf80dad4b349e1681032094a530",
//     // thumbnailUrl: `${placeholderThumbBase}/D2691E/FFFFFF?text=Banquet+2024`,
//   },
// ];

const client = generateClient();

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
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<string>("");
  const [triggerWidth, setTriggerWidth] = useState<string>("12rem");
  const triggerRef = useRef<HTMLDivElement>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Update trigger width when component mounts or resizes
  useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        const width = triggerRef.current.offsetWidth;
        setTriggerWidth(`${width}px`);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Fetch events from GraphQL
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const result = await client.graphql({ query: listGOCEvents });
        const eventsData = result.data?.listGOCEvents?.items || [];

        // TEMPORARY: Show all events regardless of galleryLink (for debugging)
        // Filter events that have a galleryLink and map to GalleryItem format
        const eventsWithGallery = eventsData
          // .filter(
          //   (event: any) =>
          //     event.galleryLink && event.galleryLink.trim() !== "",
          // )
          .map((event: any) => {
            const startDate = new Date(event.startDate);
            const isStartDateValid = !isNaN(startDate.getTime());
            const year = isStartDateValid
              ? startDate.getFullYear()
              : new Date().getFullYear();

            // Format date - show range if multi-date activity
            let formattedDate: string;
            if (isStartDateValid) {
              const startDateStr = startDate.toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              });

              // Check if there's a valid end date
              if (
                event.endDate &&
                typeof event.endDate === "string" &&
                event.endDate.trim() !== ""
              ) {
                const endDate = new Date(event.endDate);
                const isEndDateValid = !isNaN(endDate.getTime());

                if (isEndDateValid) {
                  const endDateStr = endDate.toLocaleDateString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                  });

                  // Check if dates are different (not same day)
                  if (startDateStr !== endDateStr) {
                    formattedDate = `${startDateStr} - ${endDateStr}`;
                  } else {
                    formattedDate = startDateStr;
                  }
                } else {
                  // End date is invalid, just show start date
                  formattedDate = startDateStr;
                }
              } else {
                // No end date, just show start date
                formattedDate = startDateStr;
              }
            } else {
              // Fallback if start date is invalid
              formattedDate = event.startDate || "Date TBD";
            }

            return {
              year: year,
              eventType: "Event", // Default eventType since it's not in the schema
              title: event.title,
              date: formattedDate,
              startDate: event.startDate,
              endDate: event.endDate,
              location: event.location,
              description: event.description,
              link: event.galleryLink || "WIP", // Use "WIP" if no galleryLink
              thumbnailUrl: event.imageLink || undefined,
            } as GalleryItem;
          });

        // Set only fetched events (test items are commented out)
        setGalleryItems(eventsWithGallery);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Empty array on error
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Helper function to get school year from a date
  const getSchoolYear = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1

    // If date is before July 1st, it belongs to the previous school year
    if (month < 7) {
      return `${year - 1}-${year.toString().slice(-2)}`;
    } else {
      return `${year}-${(year + 1).toString().slice(-2)}`;
    }
  };

  // Get unique school years sorted descending for the dropdown
  const uniqueSchoolYears = Array.from(
    new Set(galleryItems.map((item) => getSchoolYear(item.date))),
  ).sort((a, b) => {
    // Sort by the starting year (first part before the dash)
    const yearA = parseInt(a.split("-")[0]);
    const yearB = parseInt(b.split("-")[0]);
    return yearB - yearA;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSchoolYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchoolYear(e.target.value);
  };

  // Combined filtering logic
  const filteredItems = galleryItems.filter((item) => {
    // School Year Filter
    if (selectedSchoolYear && getSchoolYear(item.date) !== selectedSchoolYear) {
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

  // Create collection for school years
  const schoolYearCollection = createListCollection({
    items: uniqueSchoolYears.map((schoolYear) => ({
      label: schoolYear,
      value: schoolYear,
    })),
  });

  return (
    <Container fluid={true} padding={0}>
      <Stack
        width={{ sm: "100%", md: "4/5" }}
        marginX={"auto"}
        marginY={"1.8rem"}
        align={"center"}
        gap={"3rem"}
      >
        {/* Filter Controls Area */}
        <Flex
          gap={4}
          marginBottom={{ base: 6, md: 8 }}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          px="4"
        >
          {/* Search Input - aligned with cards */}
          <InputGroup width="30rem" startElement={<LuSearch />}>
            <Input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="search" // More specific placeholder
              rounded="2xl" // Match Sermons.tsx rounding
              borderColor="black" // Match Sermons.tsx border color
              _focus={{
                borderColor: "goc.blue",
                boxShadow: "0 0 0 1px {colors.goc.blue}",
              }}
            />
          </InputGroup>

          {/* School Year Filter Dropdown - right aligned with cards */}
          <Box width={{ base: "10rem", sm: "12rem" }} ref={triggerRef}>
            <Select.Root
              value={selectedSchoolYear ? [selectedSchoolYear] : []}
              onValueChange={(details) =>
                setSelectedSchoolYear(details.value[0] || "")
              }
              collection={schoolYearCollection}
            >
              <Select.HiddenSelect />
              <Select.Control width="100%" rounded="md" borderColor="gray.300">
                <Select.Trigger>
                  <Select.ValueText placeholder="All School Years" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content
                    width={triggerWidth}
                    minWidth={triggerWidth}
                    maxWidth={triggerWidth}
                  >
                    {schoolYearCollection.items.map((schoolYear) => (
                      <Select.Item key={schoolYear.value} item={schoolYear}>
                        {schoolYear.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>
          {/* Add More Filters Here (e.g., Event Type) using Select or ButtonGroup */}
        </Flex>

        {/* Gallery Grid */}
        <GalleryCardList items={filteredItems} loading={loading} />
      </Stack>
    </Container>
  );
};
