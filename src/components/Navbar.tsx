/**
 * GOC Navigation Bar
 */

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  IconButton,
  Icon,
  useDisclosure,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  useBreakpointValue,
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
} from "@/components/ui/drawer";
// import { ColorModeButton } from "@/components/ui/color-mode";
import NavLinks from "@/components/NavLinks";
import LoginButton from "@/components/LoginButton";
import Logo from "@/components/Logo";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiExternalLink } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { PRAYER_GOOGLE_FORM_LINK } from "@/constants/Links";

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
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
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
  activeMenu,
  setActiveMenu,
}: NavItemProps) => {
  const fontSize = "md";
  const fontWeight = selected ? "semibold" : "normal";
  const bgHoverColor =
    isScrolled || drawerOpen ? "{colors.goc.gray}" : "{colors.goc.gray/30}";
  const color =
    isScrolled || drawerOpen
      ? selected
        ? "{colors.goc.blue}"
        : "black"
      : "white";
  const isActive = activeMenu === name;
  const { open, onOpen, onClose, onToggle } = useDisclosure();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeMenu && activeMenu !== name) {
      setActiveMenu(null);
      onClose();
      setTimeout(() => {
        setActiveMenu(name);
        onOpen();
      }, 0);
    } else if (activeMenu === name) {
      setActiveMenu(null);
      onClose();
    } else {
      setActiveMenu(name);
      onOpen();
    }
  };

  const handlePointerDownOutside = useCallback(() => {
    if (isActive) {
      setActiveMenu(null);
      onClose();
    }
  }, [drawerOpen, isActive, onClose, setActiveMenu]);

  const isMobile = useMemo(() => {
    return (
      ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }, []);

  if (sublinks.length > 0) {
    return (
      // Dropdown menu
      <Box position={"relative"}>
        <MenuRoot
          open={isMobile ? isActive : open}
          onPointerDownOutside={handlePointerDownOutside}
        >
          <MenuTrigger asChild={true}>
            <Button
              variant="ghost"
              marginY=".5rem"
              paddingX="1rem"
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={color}
              transition="color .2s linear"
              backgroundColor={
                isMobile
                  ? isActive
                    ? bgHoverColor
                    : "transparent"
                  : open
                    ? bgHoverColor
                    : "transparent"
              }
              outline="none"
              onMouseEnter={isMobile || drawerOpen ? undefined : onOpen}
              onMouseLeave={isMobile || drawerOpen ? undefined : onClose}
              onClick={isMobile ? handleClick : onToggle}
            >
              {name}{" "}
              <RiArrowDropDownLine
                style={{
                  transition: "transform .2s ease",
                  transform: isMobile
                    ? isActive
                      ? "rotate(-180deg)"
                      : ""
                    : open
                      ? "rotate(-180deg)"
                      : "",
                }}
              />
            </Button>
          </MenuTrigger>
          <MenuContent
            width={"fit-content"}
            position={drawerOpen ? "static" : "absolute"}
            top={"3rem"}
            zIndex={"5000"}
            backgroundColor={"white"}
            boxShadow={"lg"}
            rounded={"md"}
            padding={".25rem"}
            onMouseEnter={isMobile || drawerOpen ? undefined : onOpen}
            onMouseLeave={isMobile || drawerOpen ? undefined : onClose}
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
        transition="color 0.2s linear"
        fontWeight={fontWeight}
        target={link && link === PRAYER_GOOGLE_FORM_LINK ? "_blank" : undefined}
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);
  const isXL = useBreakpointValue({ base: false, xl: true });

  const handleScroll = useCallback(() => {
    setIsScrolled(disableTransparent || window.scrollY > 30);

    /* UNCOMMENT TO HIDE NAVBAR ON SCROLL DOWN */
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

  useEffect(() => {
    setActiveMenu(null);
  }, [isXL]);

  useEffect(() => {
    if (!drawerOpen) {
      setActiveMenu(null);
    }
  }, [drawerOpen]);

  const bgColor = isScrolled ? "white" : "transparent";
  const shadow = isScrolled ? "md" : "none";
  const iconColor = isScrolled ? "black" : "goc.gray";

  return (
    <Flex
      height={"4rem"}
      width={"100%"}
      margin="0"
      paddingRight="1.5rem"
      align="center"
      justifyContent="space-between"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      backgroundColor={bgColor}
      boxShadow={shadow}
      transition="background-color .2s ease-out, box-shadow .2s ease-out, color .2s ease-out, filter .2s ease-out"
      transform={showNavbar ? "translateY(0)" : "translateY(-100%)"}
      as="nav"
    >
      {/* Logo */}
      <Logo isScrolled={isScrolled} transition="fill .2s ease-out" />

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
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))}
        <LoginButton />
        {/* <ColorModeButton /> TODO: Add dark mode toggle button */}
      </Box>

      {/* Hamburger Menu */}
      <DrawerRoot
        size={"lg"}
        placement={"end"}
        open={drawerOpen && !isXL}
        onOpenChange={(e) => setDrawerOpen(e.open)}
        onExitComplete={() => setDrawerOpen(false)}
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
              transition={"color .2s linear"}
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
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
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
