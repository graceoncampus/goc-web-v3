import {
  Box,
  Flex,
  Button,
  Image,
  Center,
  Link,
  MenuRoot,
  MenuRootProvider,
  MenuTrigger,
} from "@chakra-ui/react";

import { ColorModeButton } from "./color-mode";
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

interface NavItem {
  name: string;
  selected: boolean;
  link?: string;
  sublinks?: SubLink[];
}

interface NavbarProps {
  selectedNavItemName: string;
}

function NavItem(props: NavItem) {
  if (props.link) {
    return (
      <Button variant={"plain"} m={2}>
        <Link href={props.link} fontWeight={props.selected ? "bold" : ""}>
          {props.name}
        </Link>
      </Button>
    );
  } else if (props.sublinks && props.sublinks.length > 0) {
    return <></>;
  }
}

export default function Navbar(props: NavbarProps) {
  return (
    <Flex m={0} px={2} justify="space-between">
      <Link href="/" style={{ outline: "none" }}>
        <Center>
          <Image src="/assets/goc-header.svg" alt="Logo" />
        </Center>
      </Link>
      <Box>
        {navlinks.map((navItem) => (
          <NavItem
            name={navItem.name}
            link={navItem.link}
            sublinks={navItem.subLinks}
            selected={props.selectedNavItemName === navItem.name}
          />
        ))}
        <Link href={"/login"}>
          <Button m={2} variant={"solid"} bg={"goc.blue"} fontWeight={"bold"}>
            Log in
          </Button>
        </Link>
        <ColorModeButton />
      </Box>
    </Flex>
  );
}
