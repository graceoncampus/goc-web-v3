import { useEffect, useState } from "react";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { NavbarActiveKey } from "@/components/Navbar";
import { checkIsLoggedIn } from "@/auth/CheckLogin";
import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  List,
  Link,
  AspectRatio,
  Badge,
} from "@chakra-ui/react";
import { MinistryTeamsInfo, MinistryTeam } from "@/constants/MinistryTeamsInfo";
import { IoInformationCircle } from "react-icons/io5";

const MinistryTeams: MinistryTeam[] = MinistryTeamsInfo;

export const MinistryTeamsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fire on refresh/load
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const checkAuth = async () => {
      await checkIsLoggedIn(setIsLoggedIn);
    };
    checkAuth();

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <BannerTemplate
      title="Ministry Teams"
      activeKey={NavbarActiveKey.MINISTRY_TEAMS}
      imageSrc="/images/landing3.jpg"
      alt="Ministry Teams page banner"
    >
      <TeamsBody MinistryTeams={MinistryTeams} isUserLoggedIn={isLoggedIn} />
    </BannerTemplate>
  );
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

interface SectionProps {
  id?: string;
  heading: React.ReactNode;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ heading, id, children }) => {
  return (
    <Box width="100%" lineHeight="tall">
      <Heading
        as="h2"
        id={id}
        fontSize={{ base: "lg", md: "2xl" }}
        marginBottom={{ base: "0.5rem", md: "1rem" }}
        scrollMarginTop={"6rem"}
        textWrap={"balance"}
      >
        {heading}
      </Heading>
      <hr />
      <Box marginTop="1rem">{children}</Box>
    </Box>
  );
};

const TeamsBody: React.FC<{
  MinistryTeams: MinistryTeam[];
  isUserLoggedIn: boolean;
}> = ({ MinistryTeams, isUserLoggedIn }) => {
  return (
    <Container fluid maxWidth="800px" padding={0} textAlign="left">
      <VStack gap={"4rem"} margin={"auto"}>
        <Section heading="List of Ministry Teams">
          <List.Root paddingX={"1rem"}>
            {MinistryTeams.map((MinistryTeam) => (
              <List.Item key={slugify(MinistryTeam.title)}>
                <Link href={`#${slugify(MinistryTeam.title)}`} color="goc.blue">
                  <Text>{MinistryTeam.title}</Text>
                </Link>
              </List.Item>
            ))}
            <List.Item key="video-resources">
              <Link href={`#video-resources`} color="goc.blue">
                <Text>Video Resources</Text>
              </Link>
            </List.Item>
          </List.Root>
        </Section>

        {MinistryTeams.map((MinistryTeam) => (
          <Section
            key={slugify(MinistryTeam.title)}
            id={slugify(MinistryTeam.title)}
            heading={MinistryTeam.title}
          >
            <Text
              fontSize={{ base: "sm", md: "md", xl: "lg" }}
              marginBottom="1rem"
            >
              {MinistryTeam.description}
            </Text>
            {isUserLoggedIn ? (
              <Text
                marginBottom="1"
                fontSize={{ base: "sm", md: "md", xl: "lg" }}
              >
                Leader(s): {MinistryTeam.leaders} <br />
              </Text>
            ) : (
              <Text fontSize={{ base: "xs", md: "sm" }} fontStyle={"italic"}>
                <Link fontWeight={"semibold"} href="/login">
                  Log in
                </Link>{" "}
                to view the leader(s) of this ministry team.
              </Text>
            )}
          </Section>
        ))}
        <Section id={"video-resources"} heading={"Video Resources"}>
          <Badge
            variant={"outline"}
            size="lg"
            colorPalette="orange"
            marginBottom="1rem"
          >
            <IoInformationCircle />
            Past videos
          </Badge>
          <AspectRatio
            ratio={16 / 9}
            w="full"
            maxWidth="720px"
            marginBottom="2rem"
          >
            <iframe
              src="https://www.youtube.com/embed/QsfXoQRgdyg?si=GFnU9bNjWM_oETib"
              title="Ministry Team Video | Outreach"
              allowFullScreen={true}
            />
          </AspectRatio>
          <AspectRatio
            ratio={16 / 9}
            w="full"
            maxWidth="720px"
            marginBottom="2rem"
          >
            <iframe
              src="https://www.youtube.com/embed/sUNTOLDj1so?si=LzH8tu3rhloaKRUQ"
              title="GOC Ministry Teams | InReach"
              allowFullScreen={true}
            />
          </AspectRatio>
          <AspectRatio
            ratio={16 / 9}
            w="full"
            maxWidth="720px"
            marginBottom="2rem"
          >
            <iframe
              src="https://www.youtube.com/embed/sCT0HX7KycM?si=Ur95GuryvNZ7-XQQ"
              title="GOC Ministry Teams | Friday Nights"
              allowFullScreen={true}
            />
          </AspectRatio>
        </Section>
      </VStack>
    </Container>
  );
};
