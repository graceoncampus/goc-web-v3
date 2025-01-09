import { BannerTemplate } from "layouts/BannerTemplate";
import { NavbarActiveKey } from "components/Navbar";
import GOCButton from "components/GOCButton";
import {
  Box,
  Heading,
  Text,
  VStack,
  Center,
  AspectRatio,
} from "@chakra-ui/react";

export const AboutUsPage = () => {
  return (
    <BannerTemplate
      title="About Us"
      activeKey={NavbarActiveKey.ABOUT}
      imageSrc="/images/landing3.jpg"
      alt="About Us page banner"
      overlay
    >
      <AboutUsBody />
    </BannerTemplate>
  );
};

const AboutUsBody = () => {
  return (
    <Center>
      <VStack gap={10} maxW="800px" textAlign="center">
        <Heading
          as="h2"
          fontSize={{
            base: "2xl",
            sm: "3xl",
            md: "3xl",
            lg: "4xl",
            xl: "4xl",
          }}
        >
          Who We Are
        </Heading>
        <Box
          textAlign={"left"}
          textWrap={"pretty"}
          fontSize={{
            base: "sm",
            sm: "md",
            md: "md",
            lg: "md",
            xl: "lg",
          }}
          lineHeight="tall"
        >
          <Text>
            We are a ministry of Grace Community Church on the UCLA campus. We
            are a student group that exists to glorify God and spread a passion
            for His glory by making disciples, shepherding them to value Jesus
            Christ above all else, and training up the next generation of
            Christian leaders. In other words, we exist to edify and equip the
            saints, evangelize the lost, and exalt the Lord Jesus Christ in all
            things.
          </Text>
          <Text marginTop={"1rem"}>
            Every Friday night we gather for a time of singing, hearing God's
            Word taught, and fellowship. It is during these weekly large group
            meetings that GOC comes together corporately to worship our great
            God.
          </Text>
        </Box>
        <GOCButton
          href=""
          buttonProps={{ marginTop: "0", marginBottom: "1rem" }}
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
            src="https://www.youtube.com/embed/5T5BY1j2MkE"
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </VStack>
    </Center>
  );
};
