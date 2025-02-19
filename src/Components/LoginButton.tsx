import { Button, Link } from "@chakra-ui/react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useEffect, useState } from "react";

const LoginButton = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUser(username);
        console.log("User details:", username);
      } catch {
        console.log("No user signed in.");
      }
    };
    fetchUser();
  }, []);

  return (
    <Button
      asChild={true}
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
      {user ? (
        <Link
          onClick={async (e) => {
            e.preventDefault();
            await signOut();
            window.location.reload();
          }}
        >
          Log out
        </Link>
      ) : (
        <Link href="/login">Log In</Link>
      )}
    </Button>
  );
};

export default LoginButton;
