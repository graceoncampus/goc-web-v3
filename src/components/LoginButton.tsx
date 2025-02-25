import { Button, Link, useDisclosure } from "@chakra-ui/react";
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
import { RiArrowDropDownLine } from "react-icons/ri";

interface LoginButtonProps {
  drawerOpen?: boolean;
}

const LoginButton = ({ drawerOpen = false }: LoginButtonProps) => {
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

  const { open, onOpen, onClose, onToggle } = useDisclosure();
  const isMobile = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;

  return (
    <>
      {user ? (
        <MenuRoot
          open={open}
          positioning={{ placement: drawerOpen ? "top-end" : "bottom-end" }}
          onPointerDownOutside={onClose}
        >
          <MenuTrigger asChild>
            <Button
              position={"relative"}
              outline="none"
              border="none"
              marginX="1rem .5rem"
              marginY={".5rem"}
              color="white"
              fontWeight="bold"
              backgroundColor={open ? "rgb(48, 90, 175)" : "goc.blue"}
              borderRadius={open ? "0" : "1.2rem"}
              transition="border-radius .3s ease-in, background-color .4s ease-in"
              _hover={{
                textDecoration: "none",
                transition: "border-radius .3s ease",
              }}
              _focusVisible={{
                outline: "2px solid black",
                outlineOffset: "2px",
              }}
              onMouseEnter={isMobile ? undefined : onOpen}
              onMouseLeave={isMobile ? undefined : onClose}
              onClick={onToggle}
            >
              {user}{" "}
              <RiArrowDropDownLine
                style={{
                  transition: "transform .3s ease 0s",
                  transform: open ? "rotate(-180deg)" : "",
                }}
              />
            </Button>
          </MenuTrigger>
          <MenuContent
            position={"absolute"}
            top={drawerOpen ? "-4rem" : "-.5rem"}
            right={drawerOpen ? "100%" : "0"}
            zIndex="2000"
            backgroundColor="goc.bright_blue"
            borderRadius={0}
            width="5rem"
            padding={".25rem"}
            onMouseEnter={isMobile ? undefined : onOpen}
            onMouseLeave={isMobile ? undefined : onClose}
          >
            <MenuItem asChild value="Profile">
              <Link href="/profile" color={"white"} cursor={"pointer"}>
                <FaUser />
                Profile
              </Link>
            </MenuItem>
            <MenuItem asChild value="Log out" color={"white"}>
              <Link
                cursor={"pointer"}
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
          marginX="1rem .5rem"
          marginY={".5rem"}
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
