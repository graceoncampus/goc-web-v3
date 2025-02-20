import { Button, Link } from "@chakra-ui/react";

interface GOCButtonProps {
  href?: string;
  children: React.ReactNode;
  buttonProps?: Record<string, any>;
  type?: "button" | "submit" | "reset";
  target?: "_self" | "_blank";
}

const GOCButton: React.FC<GOCButtonProps> = ({
  href,
  children,
  buttonProps,
  type = "button",
  target = "_self",
}) => {
  return href ? (
    <Button
      asChild={true}
      variant="solid"
      outline="none"
      padding=".5rem 1rem"
      color="white"
      fontSize={{ base: "sm", md: "md" }}
      fontWeight="medium"
      boxShadow="none"
      border="none"
      marginTop="1.25rem"
      backgroundColor="goc.blue"
      transition="background .4s ease, box-shadow .4s ease"
      _hover={{
        textDecoration: "none",
        boxShadow: "md",
        backgroundColor: "rgb(49, 93, 180)", // slightly darker blue than goc.blue
        transition: "background .1s ease, box-shadow .1s ease",
      }}
      _focusVisible={{
        outline: "2px solid black",
        outlineOffset: "2px",
      }}
      {...buttonProps}
    >
      <Link href={href} target={target}>
        {children}
      </Link>
    </Button>
  ) : (
    <Button
      type={type}
      variant="solid"
      outline="none"
      color="white"
      fontSize={{ base: "xs", md: "sm" }}
      fontWeight="medium"
      boxShadow="none"
      border="none"
      marginTop="1.25rem"
      backgroundColor="goc.blue"
      transition="background .4s ease, box-shadow .4s ease"
      _hover={{
        textDecoration: "none",
        boxShadow: "md",
        backgroundColor: "rgb(49, 93, 180)", // slightly brighter blue than goc.blue
        transition: "background 50ms ease, box-shadow 50ms ease",
      }}
      _focusVisible={{
        outline: "2px solid black",
        outlineOffset: "2px",
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default GOCButton;
