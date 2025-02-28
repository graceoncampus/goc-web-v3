import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Separator,
  Text,
} from "@chakra-ui/react";
import { NavbarActiveKey } from "@/components/Navbar";
import { BannerTemplate } from "@/layouts/BannerTemplate";

export const LeadershipPage = () => {
  return (
    <BannerTemplate
      title="Leadership"
      activeKey={NavbarActiveKey.LEADERSHIP}
      imageSrc="/images/leadership.jpg"
      alt="Leadership page banner"
    >
      <LeadershipBody />
    </BannerTemplate>
  );
};

interface ProfileProps {
  src: string;
  alt: string;
  name: string;
  biography: string;
}

const Profile: React.FC<ProfileProps> = ({ src, alt, name, biography }) => {
  return (
    <Box as={"section"}>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        marginBottom={"2rem"}
        width={"100%"}
      >
        <Container
          paddingY={0}
          paddingLeft={0}
          paddingRight={{ base: "0", lg: "2rem" }}
          width={{ base: "100%", lg: "50%" }}
          marginBottom={"2rem"}
        >
          <Image src={src} alt={alt} />
        </Container>
        <Box width={{ base: "100%", lg: "50%" }}>
          <Heading as={"h3"} fontSize={"xl"}>
            {name}
          </Heading>
          <Text fontSize={"md"}>{biography}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

const LeadershipBody = () => {
  return (
    <Container maxWidth={"800px"} padding={0}>
      <Heading as={"h2"} textAlign={"left"} marginBottom={".7rem"}>
        Shepherd
      </Heading>
      <Separator size={"md"} width={"100%"} marginBottom={"2rem"} />
      <Profile
        src="images/matt.jpg"
        alt="Matt Ng"
        name="Matt Ng"
        biography="Matt was born in San Francisco and raised in a Christian home,
            coming to saving faith at a young age. He moved to Los Angeles to
            attend UCLA, and became actively involved at Grace on Campus and
            Grace Community Church during his college years. A&nbsp;graduate of The
            Master’s Seminary, he has served as the shepherd of Grace on Campus
            since 2021. Matt and his wife Kimmie (also from San Francisco and a
            UCLA alum) are blessed with three boys and a girl. In their spare
            time, the Ngs enjoy watching the Warriors when they win, visiting
            coffee shops around town, and smoking meat in their backyard smoker."
      />
      {/* Add more people using <Separator> and <Profile> (also use <Heading> if needed) */}
      {/* <Separator size={"md"} width={"100%"} marginBottom={"2rem"} /> */}
    </Container>
  );
};
