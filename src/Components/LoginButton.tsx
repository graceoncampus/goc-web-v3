import { Button, Link } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

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
    <>
      {user ? (
        <MenuRoot positioning={{ placement: "bottom-end" }}>
          <MenuTrigger asChild>
            <Button
              outline="none"
              border="none"
              margin=".5rem"
              color="white"
              fontWeight="bold"
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
              {user}
            </Button>
          </MenuTrigger>
          <MenuContent
            backgroundColor="white"
            boxShadow="md"
            rounded="md"
            padding={".25rem"}
            marginTop={".5rem"}
          >
            <MenuItem asChild value="Profile">
              <Link href="/profile">
                <FaUser />
                Profile
              </Link>
            </MenuItem>
            <MenuItem asChild value="Log out">
              <Link
                onClick={async (e) => {
                  e.preventDefault();
                  await signOut();
                  window.location.reload();
                }}
              >
                <MdLogout />
                Log out
              </Link>
            </MenuItem>
          </MenuContent>
        </MenuRoot>
      ) : (
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
          <Link href="/login">Log In</Link>
        </Button>
      )}
    </>
  );
};

export default LoginButton;
