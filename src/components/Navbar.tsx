import {
  Box,
  Flex,
  Button,
  Image,
  Center,
  Link,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";

import { ColorModeButton } from "./color-mode";
import navlinks from "./navlinks";

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
      <Button variant={"plain"} m={2} size="lg">
        <Link href={props.link} fontWeight={props.selected ? "bold" : ""}>
          {props.name}
        </Link>
      </Button>
    );
  } else if (props.sublinks && props.sublinks.length > 0) {
    return (
      <MenuRoot>
        <MenuTrigger>
          <Button variant="plain" m={2} size="lg">
            {props.name}
            <FaCaretDown />
          </Button>
        </MenuTrigger>
        <MenuContent>
          {props.sublinks.map((sublink) => (
            <MenuItem>
              <Text fontWeight="semibold">{sublink.name}</Text>
            </MenuItem>
          ))}
        </MenuContent>
      </MenuRoot>
    );
  }
}

export default function Navbar(props: NavbarProps) {
  return (
    <Flex m={0} px={2} justify="space-between">
      <Center>
        <Link href="/">
          <Image src="/assets/goc-header.svg" />
        </Link>
      </Center>
      <Box>
        {navlinks.map((navItem) => (
          <NavItem
            name={navItem.name}
            link={navItem.link}
            sublinks={navItem.subLinks}
            selected={props.selectedNavItemName === navItem.name}
          />
        ))}
        <Button m={2} variant={"solid"} bg={"goc.blue"} fontWeight={"bold"}>
          Login
        </Button>
        <ColorModeButton />
      </Box>
    </Flex>
  );
}
