import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Center,
  Link,
  Button,
  IconButton,
  Icon,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@chakra-ui/react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer";

import { ColorModeButton } from "./color-mode";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import navlinks from "./navlinks";

export enum NavbarActiveKey {
  NONE = "",
  ABOUT = "About",
  BELIEFS = "Our Beliefs",
  SERMONS = "Sermons",
  CLASSES = "Classes",
  STUDY_GUIDE = "Study Guide",
  SMALL_GROUPS = "Small Groups",
  MINISTRY_TEAMS = "Ministry Teams",
  EVENTS = "Events",
  RIDES = "Rides",
  PRAYER = "Prayer",
  LEADERSHIP = "Leadership",
  LOGIN = "Login",
}

interface SubLink {
  name: string;
  link: string;
}

interface NavItemProps {
  name: string;
  link?: string;
  sublinks?: SubLink[];
  color?: string;
  selected: boolean;
}

interface NavbarProps {
  selectedNavItemName: string;
}

const NavItem = ({
  name,
  link,
  sublinks = [],
  color,
  selected,
}: NavItemProps) => {
  if (sublinks.length > 0) {
    return (
      <Box position="relative">
        <MenuRoot>
          <MenuTrigger>
            <Button
              variant="ghost"
              margin={2}
              fontSize={15}
              fontWeight={selected ? "bold" : "normal"}
              color={color}
              transition="color 0.3s ease"
            >
              {name} <RiArrowDropDownLine />
            </Button>
          </MenuTrigger>
          <MenuContent
            position="absolute"
            top="100%"
            left="5%"
            backgroundColor="white"
            zIndex="1000"
            boxShadow="md"
            rounded="md"
            padding={1}
            marginTop={2}
          >
            {sublinks.map((sublink) => (
              <MenuItem key={sublink.name} value={sublink.name} asChild>
                <Link href={sublink.link} padding="0.5rem 1rem" display="block">
                  {sublink.name}
                </Link>
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      </Box>
    );
  }

  return (
    <Button variant="ghost" margin={2} transition="color 0.3s ease">
      <Link
        href={link}
        fontSize={15}
        color={color}
        fontWeight={selected ? "bold" : "normal"}
      >
        {name}
      </Link>
    </Button>
  );
};

const Navbar = (props: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgColor = isScrolled ? "white" : "transparent";
  const textColor = isScrolled ? "black" : "white";
  const shadow = isScrolled ? "md" : "none";

  return (
    <Flex
      margin="0"
      paddingRight="1.5rem"
      align="center"
      justify="space-between"
      position="fixed"
      width="100%"
      zIndex="1000"
      backgroundColor={bgColor}
      boxShadow={shadow}
      transition="background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease"
      as="nav"
    >
      {/* Logo */}
      <Link
        href="/"
        outline="none"
        display={drawerOpen ? "none" : "block"}
        transition="opacity 0.3s ease"
        opacity={drawerOpen ? 0 : 1}
      >
        <Center margin="1rem">
          <Image src="/assets/goc-header.svg" alt="Logo" />
        </Center>
      </Link>

      {/* Full Navbar */}
      <Box display={{ base: "none", xl: "flex" }}>
        {navlinks.map((navItem) => (
          <NavItem
            key={navItem.name}
            name={navItem.name}
            link={navItem.link}
            sublinks={navItem.subLinks}
            color={textColor}
            selected={props.selectedNavItemName === navItem.name}
          />
        ))}
        <Link href={"/login"}>
          <Button
            margin="0.5rem"
            variant="solid"
            bg="goc.blue"
            fontWeight="bold"
            borderRadius="1.2rem"
          >
            Log in
          </Button>
        </Link>
        {/* WE CAN ADD THIS LATER */}
        {/* <ColorModeButton />  */}
      </Box>

      {/* Hamburger Menu */}
      <DrawerRoot
        size="lg"
        placement="end"
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            variant="ghost"
            display={{ base: drawerOpen ? "none" : "flex", xl: "none" }}
            aria-label="Open Menu"
          >
            <Icon fontSize="35px">
              <IoMdMenu />
            </Icon>
          </IconButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {navlinks.map((navItem) => (
              <Box key={navItem.name} marginBottom="1rem">
                <NavItem
                  name={navItem.name}
                  link={navItem.link}
                  sublinks={navItem.subLinks}
                  color="black"
                  selected={props.selectedNavItemName === navItem.name}
                />
              </Box>
            ))}
          </DrawerBody>
          <DrawerFooter>
            {/* Login Button (make component later) */}
            <Link href={"/login"}>
              <Button
                marginTop="1rem"
                variant="solid"
                bg="goc.blue"
                fontWeight="bold"
                borderRadius="1.2rem"
              >
                Log in
              </Button>
            </Link>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
};

export default Navbar;
