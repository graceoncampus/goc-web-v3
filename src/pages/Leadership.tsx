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
          <Text fontSize={"md"} whiteSpace={"pre-line"}>
            {biography}
          </Text>
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
        src="images/callum.jpg"
        alt="Callum Aiken"
        name="Callum Aiken"
        biography={`Callum grew up in rural Northern Ireland where he was raised in a Christian home and came to saving faith at a young age. In 2024, he moved to Los Angeles to train for ministry at The Master’s Seminary and has been part of Grace on Campus since then. Callum’s desire is to help the students of Grace on Campus grow in their love for Jesus, His Word, and His Church.

          Alongside serving at Grace on Campus, he is on the staff of Grace Community Church and the Master’s Seminary where he is also studying for his MDiv. Callum earned his BMus in Music from Queens University Belfast and his MA in Theology from the Irish Baptist College. He is married to Emma and they live in Sawtelle. In his spare time Callum enjoys speciality coffee, history podcasts, and anything musical.`}
      />
      {/* Add more people using <Separator> and <Profile> (also use <Heading> if needed) */}
      {/* <Separator size={"md"} width={"100%"} marginBottom={"2rem"} /> */}
    </Container>
  );
};
