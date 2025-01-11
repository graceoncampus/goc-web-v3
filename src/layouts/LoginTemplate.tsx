import { Box, Container, Image } from "@chakra-ui/react";
import { Template, TemplateProps } from "./Template";

export interface LoginTemplateProps extends TemplateProps {
  imageSrc?: string;
  alt?: string;
  overlay?: boolean;
}

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
  imageSrc = "/images/landing3.jpg",
  alt = "Landing page banner",
  activeKey,
  children,
  overlay = true,
}) => {
  const bgColor = imageSrc ? "transparent" : "gray";

  return (
    <Template activeKey={activeKey}>
      <Box
        position="relative"
        width="100%"
        height="auto"
        minHeight={"100vh"}
        overflow="hidden"
        bg={bgColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* Background image */}
        <Image
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          src={imageSrc}
          alt={alt}
          objectFit="cover"
          objectPosition="center"
          userSelect="none"
        />
        {/* Overlay */}
        {overlay && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="black"
            opacity="0.4"
          />
        )}
        <Container
          width="fit-content"
          textAlign="center"
          color="black"
          backgroundColor="goc.gray/90"
          borderRadius="lg"
          boxShadow="lg"
          padding="2rem 6rem"
          marginY={"6rem"}
        >
          {children}
        </Container>
        <Box />
      </Box>
    </Template>
  );
};
