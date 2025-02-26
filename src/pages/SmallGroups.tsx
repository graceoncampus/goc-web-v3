import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { BannerTemplate } from "@/layouts/BannerTemplate";
import { NavbarActiveKey } from "@/components/Navbar";
import GOCButton from "@/components/GOCButton";

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
    <Container padding={0} fluid={true}>
      <VStack
        gap={"2.5rem"}
        maxWidth={"760px"}
        margin={"auto"}
        textAlign="center"
      >
        {/* What are Small Groups? */}
        <Box>
          <Heading as="h2" textAlign="left">
            What are Small&nbsp;Groups?
          </Heading>
          <Text textAlign="left">
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
          <Heading as="h2" textAlign="left" textWrap={"balance"}>
            I want to join a small group!
          </Heading>
          <Text textAlign="left">
            Awesome! The men's and women's small group leaders are listed in the
            links below, along with a brief introduction to help you get to know
            them better. You can connect with them in person, via messenger, or
            by email as provided in the blurbs.
          </Text>
        </Box>
        <Stack
          direction={"column"}
          gap={"1rem"}
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
