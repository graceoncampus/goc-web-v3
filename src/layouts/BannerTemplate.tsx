import { Box, Center, Heading, Image } from "@chakra-ui/react";
import { Template, TemplateProps } from "./Template";

export interface BannerTemplateProps extends TemplateProps {
  title: string;
  imageSrc?: string;
  alt?: string;
  overlay?: boolean;
}

export const BannerTemplate: React.FC<BannerTemplateProps> = ({
  title,
  imageSrc,
  alt,
  activeKey,
  children,
  overlay = true,
}) => {
  const bgColor = imageSrc ? "transparent" : "gray";
  const titleColor = imageSrc ? "white" : "black";

  return (
    <Template activeKey={activeKey}>
      <Box
        width={"100%"}
        bg={bgColor}
        padding={"12rem"}
        position={"relative"}
        overflow={"hidden"}
      >
        {imageSrc && (
          <>
            <Image
              src={imageSrc}
              alt={alt || "Banner image"}
              objectFit={"cover"}
              width={"100%"}
              height={"100%"}
              position={"absolute"}
              userSelect={"none"}
              top={0}
              left={0}
              zIndex={-2}
            />
            {overlay && (
              <Box
                position={"absolute"}
                top={0}
                left={0}
                width={"100%"}
                height={"100%"}
                bg={"rgba(0, 0, 0, 0.5)"}
                zIndex={-1}
              />
            )}
          </>
        )}
        <Center
          width={"100%"}
          height={"100%"}
          position={"absolute"}
          textAlign={"center"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          <Heading
            fontSize={{
              base: "2xl",
              sm: "4xl",
              md: "5xl",
              lg: "5xl",
              xl: "6xl",
            }}
            color={titleColor}
            lineHeight="1.2"
            fontWeight="bold"
            width="100%"
            paddingX={"1rem"}
            marginX={"auto"}
          >
            {title}
          </Heading>
        </Center>
      </Box>
      <Box marginX={"1.5rem"} marginY={"3rem"}>
        {children}
      </Box>
    </Template>
  );
};
