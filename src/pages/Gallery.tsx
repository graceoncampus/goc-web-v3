import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  Grid,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { LuSearch } from "react-icons/lu";
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
  return items.filter((section: SectionProps) => section.title.includes(query));
};

const items = [
  {
    title: "2024 Fall BBQ",
    date: "9/27/2024",
    link: "https://www.youtube.com/watch?v=F_QAgrKkR2Y",
  },
  {
    title: "2024 Fall BBQ",
    date: "9/27/2024",
    link: "https://www.youtube.com/watch?v=F_QAgrKkR2Y",
  },
  {
    title: "2024 Fall BBQ",
    date: "9/27/2024",
    link: "https://www.youtube.com/watch?v=F_QAgrKkR2Y",
  },
  {
    title: "2024 Fall BBQ",
    date: "9/27/2024",
    link: "https://www.youtube.com/watch?v=F_QAgrKkR2Y",
  },
];

const GalleryBody = () => {
  const [query, setQuery] = useState("");
  return (
    <Container fluid>
      {/* Search Bar */}
      <Box textAlign="center" marginBottom={"2rem"}>
        <InputGroup flex="1" width="40%" startElement={<LuSearch />}>
          <Input
            placeholder="Search photos"
            onChange={(e) => {
              setQuery(e.currentTarget.value);
              console.log(e.currentTarget.value);
            }}
          />
        </InputGroup>
      </Box>
      {/* Gallery */}
      <Grid templateColumns="repeat(3, 1fr)" gap={"1rem"}>
        {getFilteredItems(query, items).map((section) => (
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
      borderWidth="2px"
      borderRadius="md"
      padding={"1.5rem"}
      boxShadow={"md"}
      width={{ base: "100%", md: "27rem" }}
    >
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <Text fontSize="sm" textWrap={"balance"}>
        {date}
      </Text>
      <Link fontSize="sm" href={link} target="_blank" color="goc.blue">
        Link to Lightroom gallery
      </Link>
    </Box>
  );
};
