import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { BannerTemplate } from "layouts/BannerTemplate";
import { NavbarActiveKey } from "components/Navbar";
import GOCButton from "components/GOCButton";

export const SmallGroupsPage = () => {
  return (
    <BannerTemplate
      title="Small Groups"
      activeKey={NavbarActiveKey.SMALL_GROUPS}
      imageSrc="/images/small_groups.jpg"
      alt="Small Groups page banner"
    >
      <SmallGroupsBody />
    </BannerTemplate>
  );
};

const SmallGroupsBody = () => {
  return (
    <Container padding={0} fluid>
      <VStack
        gap={"2.5rem"}
        maxWidth={"760px"}
        margin={"auto"}
        textAlign="center"
      >
        {/* What are Small Groups? */}
        <Box>
          <Heading as="h2" fontSize={"2xl"} textAlign="center">
            What are Small&nbsp;Groups?
          </Heading>
          <Text lineHeight="1.8" textAlign="left">
            Small groups are the backbone of our discipleship ministry. Each
            small group focuses on Bible study, prayer, fellowship, and
            accountability. In these smaller, more intimate groups, we have the
            opportunity to develop deep relationships so that we can better
            love, serve, and care for each other. Each small group has a leader
            who will minister to your spiritual needs, counsel you through
            life’s tough issues, and spur you on in your walk with the Lord.
          </Text>
        </Box>

        {/* Join a Small Group! */}
        <Box>
          <Heading
            as="h2"
            fontSize={"2xl"}
            textAlign="center"
            textWrap={"balance"}
          >
            I want to join a small group!
          </Heading>
          <Text lineHeight="1.8" textAlign="center">
            Awesome! Men's and women's small group leaders are listed in the
            following links, along with a quick intro so you can get to know
            them better.
          </Text>
        </Box>
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={4}
          justifyContent="center"
          alignItems="center"
        >
          <GOCButton
            href="/docs/sgl-men.pdf"
            buttonProps={{
              width: "18rem",
              paddingY: "1.4rem",
              borderRadius: "8px",
              marginTop: "0",
            }}
          >
            Men's Small Group Leaders
          </GOCButton>
          <GOCButton
            href="/docs/sgl-women.pdf"
            buttonProps={{
              width: "18rem",
              paddingY: "1.4rem",
              borderRadius: "8px",
              marginTop: "0",
            }}
          >
            Women's Small Group Leaders
          </GOCButton>
        </Stack>
      </VStack>
    </Container>
  );
};
