/**
 * GOC Navigation Bar
 */

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Center,
  Link,
  Button,
  IconButton,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  Icon,
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

// import { ColorModeButton } from "components/ui/color-mode";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import NavLinks from "./NavLinks";
import LoginButton from "./LoginButton";

export enum NavbarActiveKey {
  NONE = "",
  ABOUT = "About Us",
  BELIEFS = "Our Beliefs",
  SERMONS = "Sermons",
  CLASSES = "Classes",
  STUDY_GUIDE = "Study Guide",
  SMALL_GROUPS = "Small Groups",
  MINISTRY_TEAMS = "Ministry Teams",
  EVENTS = "Events",
  RIDES = "Rides",
  PRAYER = "Prayer Requests",
  LEADERSHIP = "Leadership",
  LOGIN = "Login",
}

interface SublinkProps {
  name: string;
  link: string;
}

interface NavItemProps {
  name: string;
  link?: string;
  sublinks?: SublinkProps[];
  selected: boolean;
  isScrolled: boolean;
  drawerOpen: boolean;
}

interface NavbarProps {
  selectedNavItemName: string;
  disableTransparent?: boolean;
}

const NavItem = ({
  name,
  link,
  sublinks = [],
  isScrolled,
  selected,
  drawerOpen,
}: NavItemProps) => {
  const fontSize = "1rem";
  const fontWeight = selected ? "bold" : "normal";
  const color = isScrolled || drawerOpen ? "black" : "white";
  const bgHoverColor = isScrolled || drawerOpen ? "goc.gray" : "goc.gray/30";

  if (sublinks.length > 0) {
    return (
      // Dropdown menu
      <Box position="relative">
        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant="ghost"
              margin={".5rem"}
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={color}
              transition={"color 0.3s ease"}
              backgroundColor={"transparent"}
              outline="none !important"
              _hover={{
                backgroundColor: bgHoverColor,
              }}
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
            padding={".25rem"}
            marginTop={".5rem"}
          >
            {sublinks.map((sublink) => (
              <MenuItem key={sublink.name} value={sublink.name} asChild>
                <Link
                  href={sublink.link}
                  padding={".5rem 1rem"}
                  cursor={"pointer"}
                >
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
    // No dropdown menu
    <Button
      variant="ghost"
      asChild
      margin=".5rem"
      _hover={{
        backgroundColor: bgHoverColor,
      }}
    >
      <Link
        href={link}
        fontSize={fontSize}
        color={color}
        transition="color 0.3s ease"
        fontWeight={fontWeight}
      >
        {name}
      </Link>
    </Button>
  );
};

const Navbar = ({
  selectedNavItemName,
  disableTransparent = false,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (disableTransparent || window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [disableTransparent]);

  const bgColor = isScrolled ? "white" : "transparent";
  const shadow = isScrolled ? "md" : "none";
  const iconColor = isScrolled ? "black" : "goc.gray";

  return (
    <Flex
      margin="0"
      paddingRight="1.5rem"
      align="center"
      justifyContent="space-between"
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
      backgroundColor={bgColor}
      boxShadow={shadow}
      transition="background-color .3s ease, box-shadow .3s ease, color .3s ease"
      as="nav"
    >
      {/* Logo */}
      <Link href="/">
        <Center margin="1rem">
          <Image src="/assets/goc-header.svg" alt="Logo" />
        </Center>
      </Link>

      {/* Full Navbar */}
      <Box display={{ base: "none", xl: "flex" }}>
        {NavLinks.map((navItem) => (
          <NavItem
            key={navItem.name}
            name={navItem.name}
            link={navItem.link}
            sublinks={navItem.sublinks}
            selected={
              !!(
                selectedNavItemName === navItem.name ||
                navItem.sublinks?.some(
                  (sublink) => sublink.name === selectedNavItemName,
                )
              )
            }
            isScrolled={isScrolled}
            drawerOpen={drawerOpen}
          />
        ))}
        <LoginButton />
        {/* <ColorModeButton /> TODO */}
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
            variant={"ghost"}
            display={{ base: drawerOpen ? "none" : "flex", xl: "none" }}
            aria-label="Open Menu"
            backgroundColor={"transparent"}
            _hover={{
              backgroundColor: "goc.gray/30",
            }}
          >
            <Icon
              color={iconColor}
              fontSize={"2.5rem"}
              transition={"color .3s ease"}
            >
              <IoMdMenu />
            </Icon>
          </IconButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <DrawerBody paddingBottom="5rem">
            {NavLinks.map((navItem) => (
              <Box key={navItem.name} marginBottom="1rem">
                <NavItem
                  key={navItem.name}
                  name={navItem.name}
                  link={navItem.link}
                  sublinks={navItem.sublinks}
                  selected={
                    !!(
                      selectedNavItemName === navItem.name ||
                      navItem.sublinks?.some(
                        (sublink) => sublink.name === selectedNavItemName,
                      )
                    )
                  }
                  isScrolled={isScrolled}
                  drawerOpen={drawerOpen}
                />
              </Box>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <LoginButton />
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
};

export default Navbar;
