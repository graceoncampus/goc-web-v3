import { Box, Button, Link } from "@chakra-ui/react";
import { ReactNode } from "react";

interface OutlineButtonProps {
  href?: string;
  children: React.ReactNode;
  icon?: ReactNode;
  animateIcon?: boolean;
  onWhite?: boolean;
}

const OutlineButton = ({
  href,
  children,
  icon,
  animateIcon = false,
  onWhite = false,
}: OutlineButtonProps) => {
  return (
    <Button
      variant="outline"
      marginTop="1.5rem"
      asChild
      color={onWhite ? "inherit" : "white"}
      bg="transparent"
      borderRadius={onWhite ? "0.5rem" : "1.2rem"}
      borderWidth="2px"
      borderColor={onWhite ? "gray.700" : "white"}
      paddingX={{ sm: "1rem", md: "1rem", lg: "1.2rem", xl: "1.5rem" }}
      paddingY={{ sm: "0", md: "0", lg: "0.5rem", xl: "1.2rem" }}
      transition={
        animateIcon
          ? "all 0.5s ease"
          : "background 0.5s ease, color 0.5s ease, borderColor 0.5s ease"
      }
      _hover={{
        backgroundColor: onWhite ? "goc.blue" : "white",
        color: onWhite ? "white" : "black",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
        borderColor: onWhite ? "goc.blue" : "white",
        ...(icon &&
          animateIcon && {
            paddingRight: {
              sm: "2.5rem",
              md: "2.7rem",
              lg: "2.7rem",
              xl: "3rem",
            },
          }),
        transition: "all 0.4s ease",
      }}
      className="group"
    >
      <Link
        href={href}
        fontSize={{ base: "2xs", sm: "xs", md: "sm", lg: "sm", xl: "md" }}
        fontWeight="semibold"
        textTransform="uppercase"
        textDecoration="none"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        _hover={{ textDecoration: "none" }}
      >
        {children}
        {icon && (
          <Box
            as="span"
            position={animateIcon ? "absolute" : "static"}
            top={animateIcon ? "50%" : "auto"}
            right={animateIcon ? "15%" : "auto"}
            transform={
              animateIcon ? "translateY(-50%) translateX(-10px)" : "none"
            }
            opacity={animateIcon ? 0 : 1}
            transition="opacity 0.5s ease, transform 0.5s ease"
            _groupHover={
              animateIcon
                ? {
                    opacity: 1,
                    transform: "translateY(-50%) translateX(0)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }
                : undefined
            }
          >
            {icon}
          </Box>
        )}
      </Link>
    </Button>
  );
};

export default OutlineButton;
