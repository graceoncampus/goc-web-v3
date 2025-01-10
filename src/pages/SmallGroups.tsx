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
      imageSrc="/images/landing3.jpg"
      alt="Small Groups page banner"
      overlay
    >
      <SmallGroupsBody />
    </BannerTemplate>
  );
};

const SmallGroupsBody = () => {
  return (
    <VStack
      gap={8}
      textAlign="center"
      maxWidth="800px"
      marginLeft="auto"
      marginRight="auto"
      paddingTop="40px"
      paddingBottom="40px"
      paddingLeft="16px"
      paddingRight="16px"
    >
      {/* What are Small Groups? */}
      <Box>
        <Heading
          as="h2"
          fontSize="2xl"
          fontWeight="bold"
          marginBottom="16px"
          textAlign="center"
        >
          What are Small Groups?
        </Heading>
        <Text fontSize="lg" lineHeight="1.8" textAlign="left" textWrap="pretty">
          Small groups are the backbone of our discipleship ministry. Each small
          group focuses on Bible study, prayer, fellowship, and accountability.
          In these smaller, more intimate groups, we have the opportunity to
          develop deep relationships so that we can better love, serve, and care
          for each other. Each small group has a leader who will minister to
          your spiritual needs, counsel you through life’s tough issues, and
          spur you on in your walk with the Lord.
        </Text>
      </Box>

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
          marginBottom="24px"
          textAlign="center"
          textWrap="pretty"
        >
          Awesome! Men's and women's small group leaders are listed in the
          following links, along with a quick intro so you can get to know them
          better.
        </Text>
        <Stack
          direction={["column", "row"]}
          gap={4}
          marginTop={"3rem"}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            size="lg"
            backgroundColor="blue.500"
            paddingTop="12px"
            paddingBottom="12px"
            paddingLeft="24px"
            paddingRight="24px"
            borderRadius="8px"
            _hover={{ backgroundColor: "blue.600" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link href="/" color="white" fontWeight="bold">
              Men's Small Group Leaders
            </Link>
          </Button>
          <Button
            size="lg"
            backgroundColor="blue.500"
            paddingTop="12px"
            paddingBottom="12px"
            paddingLeft="24px"
            paddingRight="24px"
            borderRadius="8px"
            _hover={{ backgroundColor: "blue.600" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Link href="/" color="white" fontWeight="bold">
              Women's Small Group Leaders
            </Link>
          </Button>
        </Stack>
      </Box>
    </VStack>
  );
};
