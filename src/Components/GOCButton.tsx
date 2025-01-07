import { Button, Link } from "@chakra-ui/react";

interface GOCButtonProps {
  href?: string;
  children: React.ReactNode;
  buttonProps?: Record<string, any>;
}

const GOCButton: React.FC<GOCButtonProps> = ({
  href,
  children,
  buttonProps,
}) => {
  return (
    <Button
      asChild
      outline="none"
      margin="1rem"
      padding="1.5rem 3rem"
      color="white"
      fontSize="1rem"
      fontWeight="semibold"
      boxShadow="none"
      border="none"
      backgroundColor="goc.blue"
      borderRadius=".8rem"
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
  );
};

export default GOCButton;
