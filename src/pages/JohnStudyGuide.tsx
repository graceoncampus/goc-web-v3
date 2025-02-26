import GOCButton from "@/components/GOCButton";
import { Box, Container, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";

type SectionItem = {
  text: string;
  href: string;
};

type SectionProps = {
  title: string;
  items: SectionItem[];
};

export const JohnStudyGuidePage = () => {
  return (
    <BannerTemplate
      title="John Study Guide"
      activeKey={NavbarActiveKey.STUDY_GUIDE}
      imageSrc="/images/resources.jpeg"
      alt="Study Guide page banner"
    >
      <JohnStudyGuideBody />
    </BannerTemplate>
  );
};

const JohnStudyGuideBody = () => {
  return (
    <Container fluid>
      {/* Header */}
      <Box textAlign="center" marginBottom={"2rem"}>
        <Heading as="h1">The Gospel of John</Heading>
        <Text fontSize="sm" textWrap={"balance"}>
          A study through the &quot;I&nbsp;am&quot; statements of Jesus
        </Text>
        <GOCButton href="/docs/john-study-guide.pdf">
          View Study Guide
        </GOCButton>
      </Box>
      {/* Sections */}
      <VStack align="center" gap={"1rem"}>
        <Section
          title="Section 1"
          items={[
            {
              text: "Who is Jesus? The Word",
              href: "https://www.gracechurch.org/sermons/14063",
            },
            {
              text: "I Am Not the Christ",
              href: "https://www.gracechurch.org/sermons/15003",
            },
          ]}
        />
        <Section
          title="Section 2"
          items={[
            {
              text: "You Must Be Born Again",
              href: "https://www.gracechurch.org/sermons/4801",
            },
          ]}
        />
        <Section
          title="Section 3"
          items={[
            {
              text: "The Bread of Life",
              href: "https://www.gracechurch.org/sermons/15008",
            },
          ]}
        />
        <Section
          title="Section 4"
          items={[
            {
              text: "The Light of the World",
              href: "https://www.gracechurch.org/sermons/15026",
            },
          ]}
        />
        <Section
          title="Section 5"
          items={[
            {
              text: "The Door",
              href: "https://www.gracechurch.org/sermons/15045",
            },
            {
              text: "The Good Shepherd",
              href: "https://www.gracechurch.org/sermons/15059",
            },
          ]}
        />
        <Section
          title="Section 6"
          items={[
            {
              text: "The Resurrection and the Life",
              href: "https://www.gracechurch.org/sermons/15084",
            },
          ]}
        />
        <Section
          title="Section 7"
          items={[
            {
              text: "The Way, the Truth and the Life",
              href: "https://www.gracechurch.org/sermons/15101",
            },
          ]}
        />
        <Section
          title="Section 8"
          items={[
            {
              text: "The True Vine",
              href: "https://www.gracechurch.org/sermons/15115",
            },
          ]}
        />
        <Section
          title="Section 9"
          items={[
            {
              text: "How Important is the Resurrection?",
              href: "https://www.gty.org/library/questions/QA66/every-easter-the-newspaper-runs-an-article-that-casts-doubt-on-the-resurrection-just-how-important-is-the-resurrection-to-the-christian-faith",
            },
          ]}
        />
      </VStack>
    </Container>
  );
};

/**
 * Renders an individual section with a title and list of links
 */
const Section = ({ title, items }: SectionProps) => {
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

      <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
        {items.map(({ text, href }, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            <Link fontSize="sm" href={href} target="_blank" color="goc.blue">
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};
