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
            Small groups are the primary vehicle for discipleship in our
            ministry. Through small groups, we provide the opportunity to
            develop deeper friendships with others and grow in our love for
            Christ together through Bible study, prayer, and accountability in a
            weekly, more personal and gender-specific setting. Each small group
            is led by a student leader.
          </Text>
        </Box>

        {/* Join a Small Group! */}
        <Box>
          <Heading as="h2" textAlign="left" textWrap={"balance"}>
            I want to join a small group!
          </Heading>
          <Text textAlign="left">
            More information about both our men's and women's small group
            leaders is linked below, along with a brief introduction to help you
            get to know them better. You can connect with them in person, via
            Messenger, or by email.
          </Text>
        </Box>
        <Stack
          direction={"column"}
          gap={"1rem"}
          justifyContent="center"
          alignItems="center"
        >
          <GOCButton
            target="_blank"
            href="https://drive.google.com/file/d/19HH4TC00SZXnbohFKGI2SV_7BCs3O_v1/view?usp=sharing"
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
            target="_blank"
            href="https://drive.google.com/file/d/1Wf8okzOrVPDj2isv_NHtZenQL59R-aRa/view?usp=sharing"
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
