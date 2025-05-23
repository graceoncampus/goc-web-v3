import { BannerTemplate } from "@/layouts/BannerTemplate";
import { NavbarActiveKey } from "@/components/Navbar";
import GOCButton from "@/components/GOCButton";
import {
  Box,
  Heading,
  Text,
  VStack,
  AspectRatio,
  Container,
  Link,
} from "@chakra-ui/react";

export const AboutUsPage = () => {
  return (
    <BannerTemplate
      title="About Us"
      activeKey={NavbarActiveKey.ABOUT}
      imageSrc="/images/about.jpg"
      alt="About Us page banner"
    >
      <AboutUsBody />
    </BannerTemplate>
  );
};

const AboutUsBody = () => {
  return (
    <Container maxWidth="800px" textAlign="center">
      <VStack gap={"2.5rem"} margin={"auto"}>
        <Box lineHeight="tall">
          <Heading as="h2" textAlign="left">
            Grace on Campus
          </Heading>
          <Text textAlign="left">
            is a ministry of{" "}
            <Link
              href="https://www.gracechurch.org/"
              target="_blank"
              color="goc.blue"
              display={"inline"}
            >
              Grace Community Church
            </Link>{" "}
            on the UCLA campus. We are a student group that exists to glorify
            God and spread a passion for His glory by making disciples,
            shepherding them to value Jesus Christ above all else, and training
            up the next generation of Christian leaders. In other words, we
            exist to edify and equip the saints, evangelize the lost, and exalt
            the Lord Jesus Christ in all things.
          </Text>
          <Text marginTop={"2rem"} textAlign="left">
            Every Friday night we gather for a time of singing, hearing God's
            Word taught, and fellowship. It is during these weekly large group
            meetings that GOC comes together corporately to worship our great
            God.
          </Text>
        </Box>
        <GOCButton
          href="https://drive.google.com/file/d/1ianlpg8Z0lxr2EOt249HosHIv1TrHn2L/view?usp=sharing"
          buttonProps={{ marginTop: "0", marginBottom: "1rem" }}
          target="_blank"
        >
          Welcome Packet
        </GOCButton>
        <AspectRatio
          ratio={16 / 9}
          w="full"
          maxWidth="720px"
          marginBottom="2rem"
        >
          <iframe
            src="https://www.youtube.com/embed/lxRTy17jhZs?si=3JPbbXOliNUSNP8F"
            title="GOC Welcome Week Video"
            allowFullScreen={true}
          />
        </AspectRatio>
      </VStack>
    </Container>
  );
};
