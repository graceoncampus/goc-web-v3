import { Box, Heading, Text } from "@chakra-ui/react";
import OutlineButton from "./OutlineButton";

interface InfoBoxProps {
  title: string;
  description: string;
  buttonText: string;
  link: string;
  showBorder?: boolean;
}

const InfoBox = ({
  title,
  description,
  buttonText,
  link,
  showBorder = false,
}: InfoBoxProps) => {
  return (
    <Box
      flex={1}
      textAlign="center"
      padding={{ base: "2rem", sm: "3rem", md: "4rem", lg: "5rem", xl: "6rem" }}
      bg="transparent"
      borderRadius="md"
      border={showBorder ? { base: "none", md: "2px solid #ddd" } : "none"}
    >
      <Heading
        size={{ base: "2xl", md: "4xl", lg: "2xl", xl: "4xl" }}
        lineHeight="1.2"
        fontWeight="semibold"
        marginBottom={2}
      >
        {title}
      </Heading>
      <Text fontSize={{ base: "sm", xl: "md" }}>{description}</Text>
      <OutlineButton href={link} onWhite>
        {buttonText}
      </OutlineButton>
    </Box>
  );
};

export default InfoBox;
