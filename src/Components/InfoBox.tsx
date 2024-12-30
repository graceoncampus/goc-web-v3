import { Box, Heading, Text } from "@chakra-ui/react";
import OutlineButton from "./OutlineButton";

interface InfoBoxProps {
  title: string;
  description: string;
  buttonText: string;
  link?: string;
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
      padding={{ base: "20", lg: "16", xl: "20" }}
      bg="transparent"
      borderRadius="md"
      border={showBorder ? { base: "none", md: "2px solid #ddd" } : "none"}
    >
      <Heading size={{ base: "h4", lg: "2xl", xl: "h3" }} marginBottom={2}>
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
