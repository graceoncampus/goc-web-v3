import { Button, Link } from "@chakra-ui/react";

interface GOCButtonProps {
  href?: string;
  children: React.ReactNode;
  buttonProps?: Record<string, any>;
  type?: "button" | "submit" | "reset";
}

const GOCButton: React.FC<GOCButtonProps> = ({
  href,
  children,
  buttonProps,
  type = "button",
}) => {
  return href ? (
    <Button
      asChild
      variant="solid"
      outline="none"
      padding=".5rem 1rem"
      color="white"
      fontSize="1rem"
      fontWeight="semibold"
      boxShadow="none"
      border="none"
      backgroundColor="goc.blue"
      transition="background .4s ease, box-shadow .4s ease"
      _hover={{
        textDecoration: "none",
        boxShadow: "md",
        backgroundColor: "rgb(79, 132, 239)", // slightly brighter blue than goc.blue
        transition: "background .1s ease, box-shadow .1s ease",
      }}
      _focusVisible={{
        outline: "2px solid black",
        outlineOffset: "2px",
      }}
      {...buttonProps}
    >
      <Link href={href}>{children}</Link>
    </Button>
  ) : (
    <Button
      type={type}
      variant="solid"
      outline="none"
      color="white"
      fontSize=".875rem"
      fontWeight="semibold"
      boxShadow="none"
      border="none"
      backgroundColor="goc.blue"
      transition="background .4s ease, box-shadow .4s ease"
      _hover={{
        textDecoration: "none",
        boxShadow: "md",
        backgroundColor: "rgb(79, 132, 239)", // slightly brighter blue than goc.blue
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
