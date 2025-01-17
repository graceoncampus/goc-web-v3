import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BannerTemplate } from "layouts/BannerTemplate";
import { NavbarActiveKey } from "components/Navbar";

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
    <VStack
      gap={"2.5rem"}
      maxWidth={"760px"}
      margin={"auto"}
      textAlign="center"
    >
      {/* What are Small Groups? */}
      <Heading
        as="h2"
        fontSize={{
          base: "2xl",
          sm: "3xl",
          md: "3xl",
          lg: "4xl",
          xl: "4xl",
        }}
        fontWeight="bold"
        textAlign="center"
      >
        What are Small Groups?
      </Heading>
      <Text fontSize="lg" lineHeight="1.8" textAlign="left" textWrap="pretty">
        Small groups are the backbone of our discipleship ministry. Each small
        group focuses on Bible study, prayer, fellowship, and accountability. In
        these smaller, more intimate groups, we have the opportunity to develop
        deep relationships so that we can better love, serve, and care for each
        other. Each small group has a leader who will minister to your spiritual
        needs, counsel you through life’s tough issues, and spur you on in your
        walk with the Lord.
      </Text>

      {/* Join a Small Group! */}
      <Box>
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          marginBottom="16px"
          textAlign="center"
        >
          I want to join a small group!
        </Heading>
        <Text
          fontSize="lg"
          lineHeight="1.8"
          textAlign="center"
          textWrap="pretty"
        >
          Awesome! Men's and women's small group leaders are listed in the
          following links, along with a quick intro so you can get to know them
          better.
        </Text>
      </Box>
      <Stack
        direction={{ base: "column", lg: "row" }}
        gap={4}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          size="lg"
          backgroundColor="goc.blue"
          paddingTop="12px"
          paddingBottom="12px"
          paddingLeft="24px"
          paddingRight="24px"
          borderRadius="8px"
          _focus={{ boxShadow: "outline" }}
        >
          <Link href="/docs/sgl-men.pdf" color="white" fontWeight="bold">
            Men's Small Group Leaders
          </Link>
        </Button>
        <Button
          size="lg"
          backgroundColor="goc.blue"
          paddingTop="12px"
          paddingBottom="12px"
          paddingLeft="24px"
          paddingRight="24px"
          borderRadius="8px"
          _focus={{ boxShadow: "outline" }}
        >
          <Link href="/docs/sgl-women.pdf" color="white" fontWeight="bold">
            Women's Small Group Leaders
          </Link>
        </Button>
      </Stack>
    </VStack>
  );
};
