/**
 * GOC Navigation Bar
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  IconButton,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";
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
import { FiExternalLink } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import NavLinks from "components/NavLinks";
import LoginButton from "components/LoginButton";
import Logo from "components/Logo";

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
  external?: boolean;
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
  const { open, onOpen, onClose, onToggle } = useDisclosure();
  const isMobile = window.matchMedia(
    "(hover: none) and (pointer: coarse)",
  ).matches;
  const fontSize = "md";
  const fontWeight = selected ? "bold" : "normal";
  const color =
    isScrolled || drawerOpen
      ? selected
        ? "{colors.goc.blue}"
        : "black"
      : "white";
  const bgHoverColor =
    isScrolled || drawerOpen ? "{colors.goc.gray}" : "{colors.goc.gray/30}";

  if (sublinks.length > 0) {
    return (
      // Dropdown menu
      <Box position={"relative"}>
        <MenuRoot open={open}>
          <MenuTrigger asChild={true}>
            <Button
              variant={"ghost"}
              marginY={".5rem"}
              paddingX={"1rem"}
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={color}
              transition={"color 0.3s linear"}
              backgroundColor={open ? bgHoverColor : "transparent"}
              outline={"none"}
              onMouseEnter={isMobile ? undefined : onOpen}
              onMouseLeave={onClose}
              onClick={onToggle}
            >
              {name}{" "}
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
            top={"-.5rem"}
            zIndex={"5000"}
            backgroundColor={"white"}
            boxShadow={"lg"}
            rounded={"md"}
            padding={".25rem"}
            onMouseEnter={isMobile ? undefined : onOpen}
            onMouseLeave={onClose}
          >
            {sublinks.map((sublink) => (
              <MenuItem
                key={sublink.name}
                value={sublink.name}
                gap={".25rem"}
                asChild={true}
                textWrap={"nowrap"}
              >
                {sublink.external ? (
                  <Link
                    href={sublink.link}
                    padding={".5rem 1rem"}
                    cursor={"pointer"}
                    target={"_blank"}
                  >
                    {sublink.name}
                    <Icon fontSize={".8rem"} marginBottom={".2rem"}>
                      <FiExternalLink />
                    </Icon>
                  </Link>
                ) : (
                  <Link
                    href={sublink.link}
                    padding={".5rem 1rem"}
                    cursor={"pointer"}
                  >
                    {sublink.name}
                  </Link>
                )}
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
      variant={"ghost"}
      asChild={true}
      marginY={".5rem"}
      paddingX={"1rem"}
      _hover={{ backgroundColor: bgHoverColor }}
    >
      <Link
        href={link}
        fontSize={fontSize}
        color={color}
        transition="color 0.3s linear"
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
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    setIsScrolled(disableTransparent || window.scrollY > 50);

    {
      /* UNCOMMENT TO HIDE NAVBAR ON SCROLL DOWN */
    }
    // const THRESHOLD = 100;
    // const currentScrollY = window.scrollY;
    // if (currentScrollY > lastScrollYRef.current && currentScrollY > THRESHOLD) {
    //   setShowNavbar(false);
    // } else {
    //   setShowNavbar(true);
    // }
    // lastScrollYRef.current = currentScrollY;
  }, [disableTransparent]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

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
      transition="background-color .3s ease-out, box-shadow .3s ease-out, color .3s ease-out, filter .3s ease-out"
      transform={showNavbar ? "translateY(0)" : "translateY(-100%)"}
      as="nav"
    >
      {/* Logo */}
      <Logo isScrolled={isScrolled} transition="fill .3s ease-out" />

      {/* Full Navbar */}
      <Box display={{ base: "none", xl: "flex" }} alignItems={"center"}>
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
        size={"lg"}
        placement={"end"}
        open={drawerOpen}
        onOpenChange={(e) => setDrawerOpen(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild={true}>
          <IconButton
            variant={"ghost"}
            display={{ base: drawerOpen ? "none" : "flex", xl: "none" }}
            aria-label="Open Menu"
            backgroundColor={"transparent"}
            _hover={{ backgroundColor: "goc.gray/30" }}
          >
            <Icon
              color={iconColor}
              transition={"color .3s linear"}
              size={"2xl"}
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
            <LoginButton drawerOpen />
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </Flex>
  );
};

export default Navbar;
