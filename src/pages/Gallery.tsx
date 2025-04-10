import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  Grid,
  Input,
  InputGroup,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { LuExternalLink, LuImage, LuSearch } from "react-icons/lu";
import { useState } from "react";

type SectionProps = {
  title: string;
  date: string;
  link: string;
};

export const GalleryPage = () => {
  return (
    <BannerTemplate
      title="Gallery"
      activeKey={NavbarActiveKey.GALLERY}
      imageSrc="/images/bible.jpg"
      alt="Lightroom Gallery page banner"
    >
      <GalleryBody />
    </BannerTemplate>
  );
};

const getFilteredItems = (query: string, items: SectionProps[]) => {
  if (!query) return items;
  return items.filter((section: SectionProps) =>
    section.title
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(query.toLowerCase().replace(/\s+/g, "")),
  );
};

const items = [
  {
    title: "2025 Broomball",
    date: "1/31/2025",
    link: "https://adobe.ly/3EUNZsO",
  },
  {
    title: "2024 GOC Christmas",
    date: "12/6/2024",
    link: "https://adobe.ly/40bPCup",
  },
  {
    title: "2024 Thanksgiving Worship Night",
    date: "11/25/2024",
    link: "WIP",
  },
  {
    title: "2024 Fall BBQ",
    date: "11/1/2024",
    link: "https://adobe.ly/3APt9cQ",
  },
  {
    title: "2024 Freshman Flashlight Frenzy (FFF)",
    date: "10/23/2024",
    link: "https://adobe.ly/40mWbeg",
  },
  {
    title: "2024 Large Group",
    date: "10/18/2024",
    link: "https://adobe.ly/42Yk5Ok",
  },
  {
    title: "2024 First Large Group/Ice Cream Social",
    date: "9/27/2024",
    link: "https://adobe.ly/3NgKePn",
  },
  {
    title: "2024 Beach Day",
    date: "9/25/2024",
    link: "https://adobe.ly/3BxNHq9",
  },
  {
    title: "2024 Tour of Westwood",
    date: "9/24/2024",
    link: "https://adobe.ly/3zQuRtS",
  },
  {
    title: "2024 GOC Kickoff",
    date: "9/23/2024",
    link: "https://adobe.ly/48rIv3A",
  },
  {
    title: "2024 Spring Banquet",
    date: "6/1/2024",
    link: "https://lightroom.adobe.com/shares/5faedaf80dad4b349e1681032094a530",
  },
];

const GalleryBody = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  return (
    <Container fluid px={{ base: 8, md: 16, lg: 24 }}>
      {/* Search Bar */}
      {/* <Box textAlign="center" marginBottom={"2rem"}>
        <InputGroup flex="1" width="40%" startElement={<LuSearch />}>
          <Input
            placeholder="Search photos"
            onChange={(e) => {
              setQuery(e.currentTarget.value);
              console.log(e.currentTarget.value);
            }}
          />
        </InputGroup>
      </Box> */}
      <Box textAlign="center" marginBottom={"2rem"}>
        <InputGroup flex="1" startElement={<LuSearch />}>
          <Input
            value={searchQuery}
            onChange={handleSearch}
            width={{ base: "100%", md: "25rem" }}
            placeholder="search by event, year"
            rounded={"2xl"}
            borderColor={"black"}
          />
        </InputGroup>
      </Box>
      {/* Gallery */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={"1rem"}
      >
        {getFilteredItems(searchQuery, items).map((section) => (
          <Section
            title={section.title}
            date={section.date}
            link={section.link}
          />
        ))}
      </Grid>
    </Container>
  );
};

/**
 * Renders an individual section with a title, date, and Lightroom link
 */
const Section = ({ title, date, link }: SectionProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      padding={"1.5rem"}
      boxShadow={"sm"}
      width="100%"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "md",
      }}
    >
      <HStack gap={4} align="flex-start">
        <Box bg="gray.100" p={3} borderRadius="md" color="gray.600">
          <LuImage size={24} />
        </Box>
        <VStack align="flex-start" gap={2} flex={1}>
          <Heading as="h2" fontSize="xl" lineHeight="short">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {date}
          </Text>
          <Link
            fontSize="sm"
            href={link}
            target="_blank"
            color="goc.blue"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <LuExternalLink size={14} />
            View Gallery
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
};
