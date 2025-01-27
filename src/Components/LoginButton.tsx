import { Button, Link } from "@chakra-ui/react";

const LoginButton = () => {
  return (
    <Button
      asChild
      position="relative"
      outline="none"
      border="none"
      margin=".5rem"
      color="white"
      fontWeight="bold"
      boxShadow="none"
      backgroundColor="goc.blue"
      borderRadius="1.2rem"
      transition="background .2s ease, box-shadow .2s ease"
      _hover={{
        textDecoration: "none",
        boxShadow: "md",
        backgroundColor: "rgb(48, 90, 175)", // slightly darker blue than goc.blue
        transition: "background 50ms ease, box-shadow 50ms ease",
      }}
      _focusVisible={{
        outline: "2px solid black",
        outlineOffset: "2px",
      }}
    >
      <Link href="/login">Log in</Link>
    </Button>
  );
};

export default LoginButton;
