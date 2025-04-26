import { Box, Heading, Text } from "@chakra-ui/react";
import OutlineButton from "@/components/OutlineButton";

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
      paddingX={{
        base: "1rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
      }}
      paddingY={{
        base: "3rem",
        lg: "4rem",
        xl: "5rem",
      }}
      bg="transparent"
      borderRadius="md"
      border={showBorder ? { base: "none", md: "2px solid #ddd" } : "none"}
    >
      <Heading
        size={{ base: "2xl", md: "3xl", lg: "2xl", xl: "3xl" }}
        fontWeight="semibold"
        marginBottom={".5rem"}
        textWrap={"nowrap"}
      >
        {title}
      </Heading>
      <Text fontSize={{ base: "md", lg: "sm", xl: "md" }}>{description}</Text>
      <OutlineButton href={link} onWhite={true}>
        {buttonText}
      </OutlineButton>
    </Box>
  );
};

export default InfoBox;
