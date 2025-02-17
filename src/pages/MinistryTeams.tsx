import { BannerTemplate } from "layouts/BannerTemplate";
import { NavbarActiveKey } from "components/Navbar";
import React, { useEffect, useState } from "react";
import { checkIsLoggedIn } from "auth/CheckLogin";
import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  List,
  Link,
} from "@chakra-ui/react";

const mockTeams: MinistryTeam[] = [
  {
    title: "Welcome and Follow Up Team",
    description:
      "Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.",
    leaders: "Shawn Zhuang",
    contact: "redacted@x.com, (XXX) XXX-XXXX",
  },
  {
    title: "Music Team",
    description:
      "Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.",
    leaders: "Shawn Zhuang",
    contact: "redacted@x.com, (XXX) XXX-XXXX",
  },
  {
    title: "Sound Team",
    description:
      "Welcome and Follow Up is an outreach ministry team that exists to obey the call of Romans 15:7 to “welcome one another as Christ has welcomed you, for the glory of God”. We serve on Fridays during large group and have biweekly meetings every even Monday. Our ministry team seeks to encourage our members to grow a greater love for the church body and for nonbelievers through the means of outreach.",
    leaders: "Shawn Zhuang",
    contact: "redacted@x.com, (XXX) XXX-XXXX",
  },
];

export const MinistryTeamsPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fire on refresh/load
  useEffect(() => {
    const checkAuth = async () => {
      await checkIsLoggedIn(setIsLoggedIn);
    };
    checkAuth();
  }, []);

  return (
    <BannerTemplate
      title="Ministry Teams"
      activeKey={NavbarActiveKey.MINISTRY_TEAMS}
      imageSrc="/images/landing3.jpg"
      alt="Ministry Teams page banner"
    >
      <TeamsBody MinistryTeams={mockTeams} isUserLoggedIn={isLoggedIn} />
    </BannerTemplate>
  );
};

interface MinistryTeam {
  title: string;
  description: string;
  leaders: string;
  contact: string;
}

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
      <Heading as="h2" id={id} marginBottom="400">
        {heading}
      </Heading>
      <hr />
      <Box m="4">{children}</Box>
    </Box>
  );
};

const TeamsBody: React.FC<{
  MinistryTeams: MinistryTeam[];
  isUserLoggedIn: boolean;
}> = ({ MinistryTeams, isUserLoggedIn }) => {
  return (
    <Container maxWidth="800px" textAlign="left">
      <VStack gap={"2.5rem"} margin={"auto"}>
        <Section heading="List of Ministry Teams">
          <Text>
            <List.Root>
              {MinistryTeams.map((MinistryTeam) => (
                <List.Item>
                  <Link
                    href={`#${slugify(MinistryTeam.title)}`}
                    color="goc.blue"
                  >
                    {MinistryTeam.title}
                  </Link>
                </List.Item>
              ))}
            </List.Root>
          </Text>
        </Section>

        {MinistryTeams.map((MinistryTeam) => (
          <Section
            id={slugify(MinistryTeam.title)}
            heading={MinistryTeam.title}
          >
            <Text marginBottom="4">{MinistryTeam.description}</Text>
            {isUserLoggedIn ? (
              <>
                <Text marginBottom="1">
                  <strong>Leader(s):</strong> {MinistryTeam.leaders}
                </Text>
                <Text>
                  <strong>Contact:</strong> {MinistryTeam.contact}
                </Text>
              </>
            ) : (
              <Text>
                You need to be logged in to view the leader and contact
                information.
              </Text>
            )}
          </Section>
        ))}
      </VStack>
    </Container>
  );
};
